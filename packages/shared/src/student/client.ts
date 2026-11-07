import {
  mockEvolution,
  mockFeedCards,
  mockPreCorrection,
  mockToday,
} from './mocks.js';
import type {
  EssayDraft,
  EvolutionSnapshot,
  PreCorrection,
  RepertoireCard,
  SaveDraftInput,
  TodayHome,
  WritingAssistResult,
} from './types.js';

export interface StudentApi {
  getToday(): Promise<TodayHome>;
  getFeed(): Promise<RepertoireCard[]>;
  getDraft(draftId?: string): Promise<EssayDraft | null>;
  saveDraft(input: SaveDraftInput): Promise<EssayDraft>;
  writingAssist(input: { theme: string; text: string }): Promise<WritingAssistResult>;
  getPreCorrection(essayId: string): Promise<PreCorrection>;
  getEvolution(): Promise<EvolutionSnapshot>;
}

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

function heuristicAssist(theme: string, text: string): WritingAssistResult {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const hasThesis =
    /portanto|assim|nesse sentido|é necessário|faz-se necessário|torna-se|evidencia/.test(lower) ||
    trimmed.length > 280;
  const hasDevelopment = trimmed.split(/\n+/).filter(Boolean).length >= 2 || trimmed.length > 500;
  const hasIntervention =
    /deve|governo|escola|família|ong|campanha|política|secretaria|promover|implementar/.test(lower);
  const hasContext = trimmed.length > 80;

  const tips: WritingAssistResult['tips'] = [];
  if (!hasContext) {
    tips.push({
      area: 'contexto',
      title: 'Comece pela contextualização',
      body: `Abra com um repertório ligado a “${theme}” e conecte com a realidade brasileira antes da tese.`,
      priority: 1,
    });
  } else if (!hasThesis) {
    tips.push({
      area: 'tese',
      title: 'Feche a introdução com uma tese clara',
      body: 'Declare seu ponto de vista e antecipe os eixos que virão nos desenvolvimentos (A1/A2).',
      priority: 1,
    });
  }
  if (hasContext && !hasDevelopment) {
    tips.push({
      area: 'desenvolvimento',
      title: 'Desenvolva um argumento completo',
      body: 'Em cada parágrafo: afirmação → repertório produtivo → análise → retomada da tese.',
      priority: 2,
    });
  }
  if (hasDevelopment && !hasIntervention) {
    tips.push({
      area: 'intervencao',
      title: 'Prepare a intervenção (C5)',
      body: 'Inclua ação, agente, meio, efeito e um detalhamento — sem inventar política genérica solta.',
      priority: 2,
    });
  }
  if (tips.length === 0) {
    tips.push({
      area: 'coesao',
      title: 'Revise as articulações',
      body: 'Confira se os conectivos marcam relação real (causa, contraste, conclusão) entre os períodos.',
      priority: 1,
    });
  }

  return {
    schema_version: '1.0',
    structure: {
      hasContext,
      hasThesis,
      hasDevelopment,
      hasIntervention,
      summary: trimmed
        ? 'Leitura local do rascunho (sem chamar o modelo).'
        : 'Texto ainda vazio — comece pela introdução contextualizada.',
    },
    tips: tips.slice(0, 3),
    encouragement: 'Você está no caminho. Use as dicas para avançar sem copiar frases prontas.',
  };
}

const memoryDrafts = new Map<string, EssayDraft>();

function cloneDraft(d: EssayDraft): EssayDraft {
  return { ...d, savedRepertoireIds: [...d.savedRepertoireIds] };
}

export const mockStudentApi: StudentApi = {
  async getToday() {
    await delay();
    const draft = memoryDrafts.get(mockToday.draft!.id) ?? mockToday.draft;
    return { ...mockToday, draft: draft ? cloneDraft(draft) : null };
  },
  async getFeed() {
    await delay();
    return mockFeedCards;
  },
  async getDraft(draftId = 'draft-1') {
    await delay();
    if (memoryDrafts.has(draftId)) return cloneDraft(memoryDrafts.get(draftId)!);
    if (mockToday.draft?.id === draftId) return cloneDraft(mockToday.draft);
    return mockToday.draft ? cloneDraft(mockToday.draft) : null;
  },
  async saveDraft(input) {
    await delay();
    const id = input.id ?? mockToday.draft?.id ?? 'draft-1';
    const prev = memoryDrafts.get(id) ?? mockToday.draft!;
    const next: EssayDraft = {
      ...prev,
      id,
      theme: input.theme,
      text: input.text,
      linesUsed: input.linesUsed,
      linesMax: input.linesMax ?? prev.linesMax,
      minRecommended: input.minRecommended ?? prev.minRecommended,
      savedLabel: 'Salvo agora',
      savedRepertoireIds: input.savedRepertoireIds ?? prev.savedRepertoireIds,
    };
    memoryDrafts.set(id, next);
    return cloneDraft(next);
  },
  async writingAssist({ theme, text }) {
    await delay(180);
    return heuristicAssist(theme, text);
  },
  async getPreCorrection(essayId: string) {
    await delay();
    return { ...mockPreCorrection, essayId };
  },
  async getEvolution() {
    await delay();
    return mockEvolution;
  },
};

async function parseJson<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || `HTTP ${res.status}`);
  }
  return body as T;
}

/** Cliente HTTP — Web e Mobile apontam para a mesma API Next. */
export function createHttpStudentApi(baseUrl: string): StudentApi {
  const root = baseUrl.replace(/\/$/, '');

  return {
    async getToday() {
      return parseJson(await fetch(`${root}/api/aluno/today`));
    },
    async getFeed() {
      return parseJson(await fetch(`${root}/api/aluno/feed`));
    },
    async getDraft(draftId) {
      const q = draftId ? `?id=${encodeURIComponent(draftId)}` : '';
      return parseJson(await fetch(`${root}/api/aluno/draft${q}`));
    },
    async saveDraft(input) {
      return parseJson(
        await fetch(`${root}/api/aluno/draft`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        }),
      );
    },
    async writingAssist(input) {
      return parseJson(
        await fetch(`${root}/api/aluno/assist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        }),
      );
    },
    async getPreCorrection(essayId) {
      return parseJson(await fetch(`${root}/api/aluno/pre-correcao?essayId=${encodeURIComponent(essayId)}`));
    },
    async getEvolution() {
      return parseJson(await fetch(`${root}/api/aluno/evolucao`));
    },
  };
}

/**
 * Preferência: API HTTP se `baseUrl` existir; senão mock local.
 * Web e Mobile devem usar a mesma base (Next em :3001).
 */
export function createStudentApi(baseUrl?: string | null): StudentApi {
  const url = (baseUrl || '').trim();
  if (!url) return mockStudentApi;
  return createHttpStudentApi(url);
}

/** @deprecated use createStudentApi — mantido para imports existentes */
export const studentApi: StudentApi = mockStudentApi;

export const deepLinkPaths = {
  status: (essayId: string) => `/status/${essayId}`,
  preCorrection: (essayId: string) => `/pre-correcao/${essayId}`,
  editor: (draftId?: string) => (draftId ? `/editor?draft=${draftId}` : '/editor'),
  feed: '/feed',
  invite: (token: string) => `/convite/${token}`,
} as const;
