import {
  mockEvolution,
  mockFeedCards,
  mockPreCorrection,
  mockToday,
} from './mocks.js';
import type {
  EvolutionSnapshot,
  PreCorrection,
  RepertoireCard,
  TodayHome,
} from './types.js';

/**
 * Cliente único Mobile + Web.
 * Fase 1: retorna mocks.
 * Fase 2: trocar o corpo por fetch na nota-mil-api / Supabase (mesmo contrato).
 */
export interface StudentApi {
  getToday(): Promise<TodayHome>;
  getFeed(): Promise<RepertoireCard[]>;
  getPreCorrection(essayId: string): Promise<PreCorrection>;
  getEvolution(): Promise<EvolutionSnapshot>;
}

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

export const studentApi: StudentApi = {
  async getToday() {
    await delay();
    return mockToday;
  },
  async getFeed() {
    await delay();
    return mockFeedCards;
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

/** Deep links futuros — Mobile e Web devem aceitar os mesmos paths. */
export const deepLinkPaths = {
  status: (essayId: string) => `/status/${essayId}`,
  preCorrection: (essayId: string) => `/pre-correcao/${essayId}`,
  editor: (draftId?: string) => (draftId ? `/editor?draft=${draftId}` : '/editor'),
  feed: '/feed',
  invite: (token: string) => `/convite/${token}`,
} as const;
