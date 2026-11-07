import type { EssaySummary, PreCorrection, SendEssayInput, SendEssayResult } from '@nota-mil/shared/student';
import { getDraft, saveDraft, DEMO_DRAFT_ID } from './draft-store';
import { runPreCorrection } from './pre-correction';
import { loadLocalSecrets } from './load-local-env';

const DEMO_ESSAY_ID = '22222222-2222-4222-8222-222222222222';
const DEMO_STUDENT_ID = '00000000-0000-4000-8000-000000000001';

type Stored = {
  essay: EssaySummary;
  preCorrection: PreCorrection;
  text: string;
};

const memory = new Map<string, Stored>();

function nowLabel() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(new Date());
}

function buildPipeline(aiReady: boolean): EssaySummary['pipeline'] {
  return [
    {
      key: 'sent',
      label: 'Enviada',
      detail: `${nowLabel()} · recebemos seu texto`,
      done: true,
    },
    {
      key: 'ai',
      label: 'Pré-correção da IA',
      detail: aiReady ? 'Estimativa disponível' : 'Gerando estimativa…',
      done: aiReady,
      current: !aiReady,
    },
    {
      key: 'teacher',
      label: 'Revisão do professor',
      detail: 'Aguardando · prazo de até 3 dias',
      done: false,
      current: aiReady,
    },
    {
      key: 'official',
      label: 'Correção oficial',
      detail: 'Você será avisado quando estiver pronta',
      done: false,
    },
  ];
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
  const essay: EssaySummary = {
    id: essayId,
    theme: input.theme,
    status: 'ai_pregrading',
    statusLabel: 'Pré-correção',
    version: 1,
    sentAtLabel: `Hoje, ${nowLabel()}`,
    pipeline: buildPipeline(false),
  };

  const preCorrection = await runPreCorrection(input.theme, input.text, essayId);
  essay.status = 'ai_ready';
  essay.statusLabel = 'Pré-correção pronta';
  essay.pipeline = buildPipeline(true);

  const stored: Stored = { essay, preCorrection, text: input.text };
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
      status: string;
      version: number;
      sent_at: string | null;
    };
    const aiReady = row.status === 'ai_ready' || row.status === 'teacher_review' || row.status === 'official';
    const sentLabel = row.sent_at
      ? new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
        }).format(new Date(row.sent_at))
      : nowLabel();
    return {
      id,
      theme: row.theme,
      status: (row.status as EssaySummary['status']) || 'ai_ready',
      statusLabel: aiReady ? 'Pré-correção pronta' : 'Em processamento',
      version: row.version || 1,
      sentAtLabel: sentLabel,
      pipeline: buildPipeline(aiReady),
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

  // fallback: se já existir draft, ainda não enviado
  const draft = await getDraft();
  return {
    id: DEMO_ESSAY_ID,
    theme: draft.theme,
    status: 'draft',
    statusLabel: 'Rascunho',
    version: 1,
    sentAtLabel: 'Ainda não enviada',
    pipeline: [
      { key: 'sent', label: 'Enviada', detail: 'Aguardando envio', done: false, current: true },
      { key: 'ai', label: 'Pré-correção da IA', detail: '—', done: false },
      { key: 'teacher', label: 'Revisão do professor', detail: '—', done: false },
      { key: 'official', label: 'Correção oficial', detail: '—', done: false },
    ],
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
        if (raw?.competencies) {
          memory.set(id, {
            essay: await getEssayStatus(id),
            preCorrection: raw,
            text: '',
          });
          return raw;
        }
      }
    } catch {
      // ignore
    }
  }

  const draft = await getDraft();
  return runPreCorrection(draft.theme, draft.text, id);
}

export { DEMO_ESSAY_ID };
