# Part 1 monorepo map (essay editor + AI assist + sync)

Generated for implementation planning. Data flow today: **100% mock** on aluno screens; Supabase only on portal/auth shells.

## Run

- Root: `pnpm install` → `pnpm build:shared` → `pnpm dev:web` (http://localhost:3001) / `pnpm dev:mobile` (Expo)
- Workspace: `pnpm-workspace.yaml` → `packages/*`, `Redação Web`, `Redação Mobile`

## 1. Web essay editor

- Page: `Redação Web/src/app/aluno/editor/page.tsx` — local `useState` textarea; theme/lines from mock; Enviar → `/aluno/status`
- Shell: `Redação Web/src/components/aluno/PhoneShell.tsx`
- Sibling aluno screens (all mock): `hoje`, `feed`, `evolucao`, `perfil`, `status`, `pre-correcao`, onboarding/login
- Mock source (duplicated, not shared): `Redação Web/src/lib/student-mock.ts`

## 2. Mobile editor

- Screen: `Redação Mobile/app/editor.tsx` — same UX as web
- Mock source (duplicated): `Redação Mobile/src/data/student.ts`
- Routes: `app/(tabs)/{hoje,feed,evolucao,perfil}.tsx`, `status.tsx`, `pre-correcao.tsx`

## 3. packages/shared student

- `packages/shared/src/student/types.ts` — EssayDraft, EssayStatus, PreCorrection, TodayHome, RepertoireCard
- `packages/shared/src/student/mocks.ts` — Marina draft + feed + pre-correction
- `packages/shared/src/student/client.ts` — `studentApi` (getToday/getFeed/getPreCorrection/getEvolution) **mock-only; unused by apps**
- `packages/shared/src/student/index.ts` — re-exports
- Also: `api-client/client.ts` (HTTP helper), `assessment/schemas.ts`, Neon essay DDL in `db/neon/001_core.sql`

## 4. Next.js API routes

- Only: `Redação Web/src/app/auth/callback/route.ts` (OAuth redirect stub)
- No essay/draft/AI routes yet
- `Redação Web/src/lib/api/index.ts` → `ApiClient` → `NEXT_PUBLIC_API_URL` default `http://localhost:3333` (external API expected)

## 5. Supabase usage

- Web: `Redação Web/src/lib/supabase.ts` (`getSupabase`) used by portal/auth, **not** aluno editor
- Mobile: `Redação Mobile/src/lib/session.ts` (SecureStore + optional `mobileApi`) — portal/session oriented
- Env keys listed in `packages/integrations/src/env.ts` (incl. GEMINI_*)

## Current data flow

```
Editor (web/mobile) → local duplicate mocks → local React state (no persist/sync)
studentApi (shared) → mocks (ready swap) → NOT wired
Portal auth → Supabase client (optional if env set)
apiClient / mobileApi → localhost:3333 / EXPO_PUBLIC_API_URL (no essay endpoints in-repo)
```

## Smallest file set for working Part 1

1. `packages/shared/src/student/client.ts` (+ types) — add `getDraft`/`saveDraft`/`sendEssay`/`writingAssist`; keep mock fallback
2. `Redação Web/src/app/aluno/editor/page.tsx` — use `studentApi`; debounce save; assist UI
3. `Redação Mobile/app/editor.tsx` — same contract
4. Delete/redirect duplicates: `Redação Web/src/lib/student-mock.ts`, `Redação Mobile/src/data/student.ts` (point other aluno screens to shared)
5. Persistence (pick one):
   - A) Next routes under `Redação Web/src/app/api/essays/**` + Neon (`db/neon/001_core.sql` essays/essay_versions) + Gemini server route
   - B) Implement same methods against external `nota-mil-api` via `ApiClient`
6. Env wiring: web `NEXT_PUBLIC_*`, mobile `EXPO_PUBLIC_*`, server `GEMINI_API_KEY` (see `dados e chaves/`)

## Gaps for Part 1

- No AI writing assist UI/API (Gemini docs only under `dados e chaves/`)
- No draft sync web↔mobile
- Shared `studentApi` unused; triple mock copies
