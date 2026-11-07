import type {
  EssaySummary,
  EssayStatus,
  OfficialGrade,
  PreCorrection,
  SendEssayInput,
  SendEssayResult,
} from '@nota-mil/shared/student';
import { getDraft, saveDraft, DEMO_DRAFT_ID } from './draft-store';
import { runPreCorrection } from './pre-correction';
import { loadLocalSecrets } from './load-local-env';

const DEMO_ESSAY_ID = '22222222-2222-4222-8222-222222222222';
const DEMO_STUDENT_ID = '00000000-0000-4000-8000-000000000001';

export type StoredEssay = {
  essay: EssaySummary;
  preCorrection: PreCorrection;
  text: string;
  official?: OfficialGrade | null;
};

const memory = new Map<string, StoredEssay>();

function nowLabel() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(new Date());
}

export function buildPipeline(
  status: EssayStatus,
  opts?: { sentLabel?: string; officialTotal?: number; teacherDetail?: string },
): EssaySummary['pipeline'] {
  const sent = opts?.sentLabel || nowLabel();
  const aiDone = status !== 'draft' && status !== 'sent' && status !== 'ai_pregrading';
  const teacherDone = status === 'official';
  const returned = status === 'revision_requested';
  const officialDone = status === 'official';

  return [
    {
      key: 'sent',
      label: 'Enviada',
      detail: `${sent} · recebemos seu texto`,
      done: status !== 'draft',
      current: status === 'draft' || status === 'sent',
    },
    {
      key: 'ai',
      label: 'Pré-correção da IA',
      detail: aiDone ? 'Estimativa disponível' : status === 'ai_pregrading' ? 'Gerando…' : '—',
      done: aiDone,
      current: status === 'ai_pregrading',
    },
    {
      key: 'teacher',
      label: 'Revisão do professor',
      detail: teacherDone
        ? 'Concluída'
        : returned
          ? opts?.teacherDetail || 'Devolvida para reescrita'
          : aiDone
            ? 'Aguardando · prazo de até 3 dias'
            : '—',
      done: teacherDone,
      current: status === 'ai_ready' || status === 'teacher_review' || returned,
    },
    {
      key: 'official',
      label: 'Correção oficial',
      detail: officialDone
        ? `Publicada · ${opts?.officialTotal ?? '—'}/1000`
        : returned
          ? 'Aguardando nova versão'
          : 'Você será avisado quando estiver pronta',
      done: officialDone,
      current: officialDone,
    },
  ];
}

function statusLabel(status: EssayStatus): string {
  switch (status) {
    case 'ai_ready':
      return 'Pré-correção pronta';
    case 'teacher_review':
      return 'Em revisão';
    case 'official':
      return 'Nota oficial';
    case 'revision_requested':
      return 'Reescrita solicitada';
    case 'ai_pregrading':
      return 'Pré-correção';
    default:
      return status;
  }
}

async function persistNeon(essayId: string, theme: string, text: string, linesUsed: number, pre: PreCorrection) {
  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    await sql`
      INSERT INTO profiles (id, email, full_name, role, is_minor)
      VALUES (${DEMO_STUDENT_ID}::uuid, 'marina.demo@notamil.local', 'Marina', 'student', false)
      ON CONFLICT (id) DO NOTHING
    `;
    await sql`
      INSERT INTO essays (id, student_id, theme, status, version, lines_max, sent_at)
      VALUES (${essayId}::uuid, ${DEMO_STUDENT_ID}::uuid, ${theme}, 'ai_ready', 1, 30, now())
      ON CONFLICT (id) DO UPDATE
      SET theme = EXCLUDED.theme, status = 'ai_ready', sent_at = now(), updated_at = now()
    `;
    const ver = await sql`
      SELECT COALESCE(MAX(version), 0)::int AS v FROM essay_versions WHERE essay_id = ${essayId}::uuid
    `;
    const nextVer = ((ver[0] as { v: number }).v || 0) + 1;
    const versionRows = await sql`
      INSERT INTO essay_versions (essay_id, version, body, lines_used)
      VALUES (${essayId}::uuid, ${nextVer}, ${text}, ${linesUsed})
      RETURNING id::text AS id
    `;
    const versionId = (versionRows[0] as { id: string }).id;
    await sql`
      INSERT INTO pre_corrections (essay_id, essay_version_id, model, estimated_total, max_total, competencies, attention, raw_response)
      VALUES (
        ${essayId}::uuid,
        ${versionId}::uuid,
        ${process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite'},
        ${pre.estimatedTotal},
        ${pre.maxTotal},
        ${JSON.stringify(pre.competencies)}::jsonb,
        ${JSON.stringify(pre.attention)}::jsonb,
        ${JSON.stringify(pre)}::jsonb
      )
    `;
  } catch {
    // memória local já cobre o fluxo
  }
}

export async function sendEssay(input: SendEssayInput): Promise<SendEssayResult> {
  const draftId = input.draftId || DEMO_DRAFT_ID;
  await saveDraft({
    id: draftId,
    theme: input.theme,
    text: input.text,
    linesUsed: input.linesUsed,
  });

  const essayId = DEMO_ESSAY_ID;
  const sentLabel = `Hoje, ${nowLabel()}`;
  const essay: EssaySummary = {
    id: essayId,
    theme: input.theme,
    status: 'ai_pregrading',
    statusLabel: statusLabel('ai_pregrading'),
    version: 1,
    sentAtLabel: sentLabel,
    pipeline: buildPipeline('ai_pregrading', { sentLabel }),
  };

  const preCorrection = await runPreCorrection(input.theme, input.text, essayId);
  essay.status = 'ai_ready';
  essay.statusLabel = statusLabel('ai_ready');
  essay.pipeline = buildPipeline('ai_ready', { sentLabel });

  const stored: StoredEssay = { essay, preCorrection, text: input.text, official: null };
  memory.set(essayId, stored);
  await persistNeon(essayId, input.theme, input.text, input.linesUsed, preCorrection);
  return { essay, preCorrection };
}

async function tryNeonStatus(id: string): Promise<EssaySummary | null> {
  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    const rows = await sql`
      SELECT theme, status::text AS status, version, sent_at
      FROM essays
      WHERE id = ${id}::uuid
      LIMIT 1
    `;
    if (!rows.length) return null;
    const row = rows[0] as {
      theme: string;
      status: EssayStatus;
      version: number;
      sent_at: string | null;
    };
    const sentLabel = row.sent_at
      ? new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
        }).format(new Date(row.sent_at))
      : nowLabel();

    let officialTotal: number | undefined;
    if (row.status === 'official') {
      const rev = await sql`
        SELECT total FROM teacher_reviews
        WHERE essay_id = ${id}::uuid AND action = 'publish'
        ORDER BY created_at DESC LIMIT 1
      `;
      if (rev.length) officialTotal = (rev[0] as { total: number }).total;
    }

    return {
      id,
      theme: row.theme,
      status: row.status,
      statusLabel: statusLabel(row.status),
      version: row.version || 1,
      sentAtLabel: sentLabel,
      pipeline: buildPipeline(row.status, { sentLabel, officialTotal }),
    };
  } catch {
    return null;
  }
}

export async function getEssayStatus(essayId?: string): Promise<EssaySummary> {
  const id = essayId || DEMO_ESSAY_ID;
  const hit = memory.get(id);
  if (hit) return hit.essay;

  const fromDb = await tryNeonStatus(id);
  if (fromDb) return fromDb;

  const draft = await getDraft();
  return {
    id: DEMO_ESSAY_ID,
    theme: draft.theme,
    status: 'draft',
    statusLabel: 'Rascunho',
    version: 1,
    sentAtLabel: 'Ainda não enviada',
    pipeline: buildPipeline('draft'),
  };
}

export async function getPreCorrection(essayId?: string): Promise<PreCorrection> {
  const id = essayId || DEMO_ESSAY_ID;
  const hit = memory.get(id);
  if (hit) return hit.preCorrection;

  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (url) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(url);
      const rows = await sql`
        SELECT raw_response
        FROM pre_corrections
        WHERE essay_id = ${id}::uuid
        ORDER BY created_at DESC
        LIMIT 1
      `;
      if (rows.length) {
        const raw = (rows[0] as { raw_response: PreCorrection }).raw_response;
        if (raw?.competencies) return raw;
      }
    } catch {
      // ignore
    }
  }

  const draft = await getDraft();
  return runPreCorrection(draft.theme, draft.text, id);
}

export async function getOfficialGrade(essayId?: string): Promise<OfficialGrade | null> {
  const id = essayId || DEMO_ESSAY_ID;
  const hit = memory.get(id);
  if (hit?.official) return hit.official;

  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    const rows = await sql`
      SELECT competencies, total, teacher_note, created_at
      FROM teacher_reviews
      WHERE essay_id = ${id}::uuid AND action = 'publish'
      ORDER BY created_at DESC
      LIMIT 1
    `;
    if (!rows.length) return null;
    const r = rows[0] as {
      competencies: OfficialGrade['competencies'];
      total: number;
      teacher_note: string;
      created_at: string;
    };
    return {
      essayId: id,
      total: r.total,
      maxTotal: 1000,
      competencies: r.competencies,
      teacherNote: r.teacher_note,
      publishedAtLabel: new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      }).format(new Date(r.created_at)),
    };
  } catch {
    return null;
  }
}

/** Acesso interno para a fila do professor. */
export function touchEssayMemory() {
  return memory;
}

export { DEMO_ESSAY_ID };
