import type {
  CompetencyId,
  CompetencyScore,
  EssayStatus,
  OfficialGrade,
  PreCorrection,
  TeacherEssayDetail,
  TeacherQueueItem,
  TeacherReviewInput,
} from '@nota-mil/shared/student';
import {
  DEMO_ESSAY_ID,
  buildPipeline,
  getEssayStatus,
  getPreCorrection,
  touchEssayMemory,
} from './essay-store';
import { loadLocalSecrets } from './load-local-env';

const DEMO_TEACHER_ID = '00000000-0000-4000-8000-000000000002';
const ALLOWED = new Set([0, 40, 80, 120, 160, 200]);

const LABELS: Record<CompetencyId, string> = {
  C1: 'Norma culta',
  C2: 'Tema e repertório',
  C3: 'Argumentação',
  C4: 'Coesão',
  C5: 'Proposta de intervenção',
};

function queueStatusLabel(status: EssayStatus): string {
  switch (status) {
    case 'ai_ready':
      return 'Aguardando professor';
    case 'teacher_review':
      return 'Em revisão';
    case 'official':
      return 'Nota oficial';
    case 'revision_requested':
      return 'Devolvida para reescrita';
    default:
      return status;
  }
}

function clampScore(n: number) {
  if (ALLOWED.has(n)) return n;
  return [...ALLOWED].reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a), 120);
}

function nowLabel() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(new Date());
}

function nowLabelFrom(iso: string) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export async function listTeacherQueue(): Promise<TeacherQueueItem[]> {
  const items: TeacherQueueItem[] = [];
  const mem = touchEssayMemory();

  for (const [essayId, stored] of mem.entries()) {
    items.push({
      essayId,
      studentName: 'Marina',
      theme: stored.essay.theme,
      status: stored.essay.status,
      statusLabel: queueStatusLabel(stored.essay.status),
      estimatedTotal: stored.preCorrection?.estimatedTotal ?? null,
      sentAtLabel: stored.essay.sentAtLabel,
      updatedAtLabel: stored.essay.sentAtLabel,
    });
  }

  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (url) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(url);
      const rows = await sql`
        SELECT
          e.id::text AS essay_id,
          p.full_name AS student_name,
          e.theme,
          e.status::text AS status,
          e.sent_at,
          e.updated_at,
          pc.estimated_total
        FROM essays e
        JOIN profiles p ON p.id = e.student_id
        LEFT JOIN LATERAL (
          SELECT estimated_total FROM pre_corrections
          WHERE essay_id = e.id
          ORDER BY created_at DESC LIMIT 1
        ) pc ON true
        WHERE e.status IN ('ai_ready', 'teacher_review', 'official', 'revision_requested', 'sent', 'ai_pregrading')
        ORDER BY e.updated_at DESC
        LIMIT 50
      `;
      for (const row of rows as Array<{
        essay_id: string;
        student_name: string;
        theme: string;
        status: EssayStatus;
        sent_at: string | null;
        updated_at: string;
        estimated_total: number | null;
      }>) {
        if (items.some((i) => i.essayId === row.essay_id)) continue;
        items.push({
          essayId: row.essay_id,
          studentName: row.student_name,
          theme: row.theme,
          status: row.status,
          statusLabel: queueStatusLabel(row.status),
          estimatedTotal: row.estimated_total,
          sentAtLabel: row.sent_at ? nowLabelFrom(row.sent_at) : '—',
          updatedAtLabel: nowLabelFrom(row.updated_at),
        });
      }
    } catch {
      // só memória
    }
  }

  return items;
}

export async function getTeacherEssay(essayId: string): Promise<TeacherEssayDetail> {
  const id = essayId || DEMO_ESSAY_ID;
  const mem = touchEssayMemory().get(id);
  let text = mem?.text || '';
  let pre: PreCorrection | null = mem?.preCorrection || null;
  let status = mem?.essay.status || ('ai_ready' as EssayStatus);
  let theme = mem?.essay.theme || '';
  let studentName = 'Marina';
  let official: OfficialGrade | null = mem?.official || null;

  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (url) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(url);
      const rows = await sql`
        SELECT e.theme, e.status::text AS status, p.full_name AS student_name, v.body
        FROM essays e
        JOIN profiles p ON p.id = e.student_id
        LEFT JOIN LATERAL (
          SELECT body FROM essay_versions WHERE essay_id = e.id ORDER BY version DESC LIMIT 1
        ) v ON true
        WHERE e.id = ${id}::uuid
        LIMIT 1
      `;
      if (rows.length) {
        const row = rows[0] as {
          theme: string;
          status: EssayStatus;
          student_name: string;
          body: string | null;
        };
        theme = row.theme;
        status = row.status;
        studentName = row.student_name;
        if (row.body) text = row.body;
      }
      if (!pre) {
        try {
          pre = await getPreCorrection(id);
        } catch {
          pre = null;
        }
      }
      const rev = await sql`
        SELECT competencies, total, teacher_note, created_at
        FROM teacher_reviews
        WHERE essay_id = ${id}::uuid AND action = 'publish'
        ORDER BY created_at DESC
        LIMIT 1
      `;
      if (rev.length) {
        const r = rev[0] as {
          competencies: CompetencyScore[];
          total: number;
          teacher_note: string;
          created_at: string;
        };
        official = {
          essayId: id,
          total: r.total,
          maxTotal: 1000,
          competencies: r.competencies,
          teacherNote: r.teacher_note,
          publishedAtLabel: nowLabelFrom(r.created_at),
        };
      }
    } catch {
      // ignore
    }
  }

  if (!theme) {
    const st = await getEssayStatus(id);
    theme = st.theme;
    status = st.status;
  }
  if (!pre) {
    try {
      pre = await getPreCorrection(id);
    } catch {
      pre = null;
    }
  }

  return {
    essayId: id,
    studentName,
    theme,
    text: text || '(Texto ainda não disponível nesta sessão. Peça ao aluno reenviar.)',
    status,
    statusLabel: queueStatusLabel(status),
    preCorrection: pre,
    official,
  };
}

export async function reviewEssay(essayId: string, input: TeacherReviewInput) {
  const id = essayId || DEMO_ESSAY_ID;
  const detail = await getTeacherEssay(id);
  const base = detail.preCorrection?.competencies || [];

  const competencies: CompetencyScore[] = (['C1', 'C2', 'C3', 'C4', 'C5'] as CompetencyId[]).map(
    (cid) => {
      const fromInput = input.competencies.find((c) => c.id === cid);
      const fromBase = base.find((c) => c.id === cid);
      const score = clampScore(Number(fromInput?.score ?? fromBase?.score ?? 120));
      return { id: cid, label: LABELS[cid], score, max: 200 };
    },
  );
  const total = competencies.reduce((s, c) => s + c.score, 0);
  const note = (input.teacherNote || '').trim();
  const mem = touchEssayMemory().get(id);

  if (input.action === 'publish') {
    const official: OfficialGrade = {
      essayId: id,
      total,
      maxTotal: 1000,
      competencies,
      teacherNote: note || 'Correção publicada pelo professor.',
      publishedAtLabel: nowLabel(),
    };
    if (mem) {
      mem.official = official;
      mem.essay = {
        ...mem.essay,
        status: 'official',
        statusLabel: 'Nota oficial',
        pipeline: buildPipeline('official', {
          sentLabel: mem.essay.sentAtLabel,
          officialTotal: total,
        }),
      };
    }
    await persistReview(id, 'publish', competencies, total, note);
    return { ok: true as const, action: 'publish' as const, official };
  }

  if (mem) {
    mem.essay = {
      ...mem.essay,
      status: 'revision_requested',
      statusLabel: 'Reescrita solicitada',
      pipeline: buildPipeline('revision_requested', {
        sentLabel: mem.essay.sentAtLabel,
        teacherDetail: note || 'Devolvida para ajuste',
      }),
    };
  }
  await persistReview(id, 'return', competencies, total, note);
  return { ok: true as const, action: 'return' as const, teacherNote: note };
}

async function persistReview(
  essayId: string,
  action: 'publish' | 'return',
  competencies: CompetencyScore[],
  total: number,
  note: string,
) {
  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    await sql`
      INSERT INTO profiles (id, email, full_name, role, is_minor)
      VALUES (${DEMO_TEACHER_ID}::uuid, 'prof.demo@notamil.local', 'Prof. Ana', 'teacher', false)
      ON CONFLICT (id) DO NOTHING
    `;
    const nextStatus = action === 'publish' ? 'official' : 'revision_requested';
    await sql`
      UPDATE essays
      SET status = ${nextStatus}::essay_status, updated_at = now()
      WHERE id = ${essayId}::uuid
    `;
    await sql`
      INSERT INTO teacher_reviews (essay_id, teacher_id, action, competencies, total, teacher_note)
      VALUES (
        ${essayId}::uuid,
        ${DEMO_TEACHER_ID}::uuid,
        ${action},
        ${JSON.stringify(competencies)}::jsonb,
        ${total},
        ${note}
      )
    `;
  } catch {
    // memória cobre o demo
  }
}
