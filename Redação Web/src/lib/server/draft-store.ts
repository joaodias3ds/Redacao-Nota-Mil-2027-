import { mockToday } from '@nota-mil/shared/student';
import type { EssayDraft, SaveDraftInput } from '@nota-mil/shared/student';
import { loadLocalSecrets } from './load-local-env';

/** UUID estável do rascunho demo (Web ↔ Mobile). */
export const DEMO_DRAFT_ID = '11111111-1111-4111-8111-111111111111';
const DEMO_STUDENT_ID = '00000000-0000-4000-8000-000000000001';

const memory = new Map<string, EssayDraft>();

function seed(): EssayDraft {
  const base = mockToday.draft!;
  return {
    ...base,
    id: DEMO_DRAFT_ID,
    savedRepertoireIds: [...base.savedRepertoireIds],
  };
}

function fromMemory(id: string): EssayDraft {
  const key = normalizeId(id);
  if (!memory.has(key)) memory.set(key, seed());
  const d = memory.get(key)!;
  return { ...d, savedRepertoireIds: [...d.savedRepertoireIds] };
}

function normalizeId(id?: string | null) {
  if (!id || id === 'draft-1') return DEMO_DRAFT_ID;
  return id;
}

async function tryNeonGet(id: string): Promise<EssayDraft | null> {
  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    const rows = await sql`
      SELECT e.id::text AS id, e.theme, e.lines_max, v.body, v.lines_used
      FROM essays e
      LEFT JOIN LATERAL (
        SELECT body, lines_used FROM essay_versions
        WHERE essay_id = e.id ORDER BY version DESC LIMIT 1
      ) v ON true
      WHERE e.id = ${id}::uuid
      LIMIT 1
    `;
    if (!rows.length) return null;
    const row = rows[0] as {
      id: string;
      theme: string;
      lines_max: number;
      body: string | null;
      lines_used: number | null;
    };
    const base = seed();
    return {
      ...base,
      id: row.id,
      theme: row.theme,
      text: row.body ?? '',
      linesUsed: row.lines_used ?? 0,
      linesMax: row.lines_max ?? 30,
      savedLabel: 'Salvo no Neon',
    };
  } catch {
    return null;
  }
}

async function tryNeonSave(draft: EssayDraft): Promise<boolean> {
  loadLocalSecrets();
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);

    await sql`
      INSERT INTO profiles (id, email, full_name, role, is_minor)
      VALUES (${DEMO_STUDENT_ID}::uuid, 'marina.demo@notamil.local', 'Marina', 'student', false)
      ON CONFLICT (id) DO NOTHING
    `;

    await sql`
      INSERT INTO essays (id, student_id, theme, status, version, lines_max)
      VALUES (${draft.id}::uuid, ${DEMO_STUDENT_ID}::uuid, ${draft.theme}, 'draft', 1, ${draft.linesMax})
      ON CONFLICT (id) DO UPDATE
      SET theme = EXCLUDED.theme, lines_max = EXCLUDED.lines_max, updated_at = now()
    `;

    const ver = await sql`
      SELECT COALESCE(MAX(version), 0)::int AS v FROM essay_versions WHERE essay_id = ${draft.id}::uuid
    `;
    const nextVer = ((ver[0] as { v: number }).v || 0) + 1;
    await sql`
      INSERT INTO essay_versions (essay_id, version, body, lines_used)
      VALUES (${draft.id}::uuid, ${nextVer}, ${draft.text}, ${draft.linesUsed})
    `;
    return true;
  } catch {
    return false;
  }
}

export async function getDraft(id?: string): Promise<EssayDraft> {
  const key = normalizeId(id);
  const fromDb = await tryNeonGet(key);
  if (fromDb) {
    memory.set(fromDb.id, fromDb);
    return fromDb;
  }
  return fromMemory(key);
}

export async function saveDraft(input: SaveDraftInput): Promise<EssayDraft> {
  const key = normalizeId(input.id);
  const prev = await getDraft(key);
  const next: EssayDraft = {
    ...prev,
    id: key,
    theme: input.theme,
    text: input.text,
    linesUsed: input.linesUsed,
    linesMax: input.linesMax ?? prev.linesMax,
    minRecommended: input.minRecommended ?? prev.minRecommended,
    savedLabel: 'Salvo agora',
    savedRepertoireIds: input.savedRepertoireIds ?? prev.savedRepertoireIds,
  };
  memory.set(next.id, next);
  const ok = await tryNeonSave(next);
  if (ok) next.savedLabel = 'Salvo (sincronizado)';
  return { ...next, savedRepertoireIds: [...next.savedRepertoireIds] };
}
