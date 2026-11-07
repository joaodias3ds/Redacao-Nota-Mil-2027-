/** Contratos do app do aluno (telas do PDF). Trocar mock → API sem mudar as telas. */

export type EssayStatus =
  | 'draft'
  | 'sent'
  | 'ai_pregrading'
  | 'ai_ready'
  | 'teacher_review'
  | 'official'
  | 'revision_requested'
  | 'failed';

export type CompetencyId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5';

export interface CompetencyScore {
  id: CompetencyId;
  label: string;
  score: number;
  max: number;
  delta?: number;
  attention?: boolean;
  comment?: string;
}

export interface RepertoireCard {
  id: string;
  kind: 'conceito' | 'citacao' | 'dado' | 'obra' | 'lei';
  competency: CompetencyId;
  title: string;
  subtitle: string;
  body: string;
  howToUse: string;
  source: string;
  themeTags: string[];
  saved?: boolean;
}

export interface EssayDraft {
  id: string;
  theme: string;
  text: string;
  linesUsed: number;
  linesMax: number;
  minRecommended: number;
  savedLabel: string;
  savedRepertoireIds: string[];
}

export interface EssaySummary {
  id: string;
  theme: string;
  status: EssayStatus;
  statusLabel: string;
  pipeline: Array<{
    key: string;
    label: string;
    detail: string;
    done: boolean;
    current?: boolean;
  }>;
  version: number;
  sentAtLabel: string;
}

export interface PreCorrection {
  essayId: string;
  estimatedTotal: number;
  maxTotal: number;
  competencies: CompetencyScore[];
  attention: {
    competency: CompetencyId;
    title: string;
    body: string;
  };
  disclaimer: string;
}

export interface EvolutionPoint {
  id: string;
  label: string;
  total: number;
}

export interface EvolutionSnapshot {
  latestTotal: number;
  deltaSinceFirst: number;
  points: EvolutionPoint[];
  competencies: CompetencyScore[];
  attendance: { present: number; total: number; label: string };
}

export interface TodayHome {
  greeting: string;
  studentName: string;
  draft: EssayDraft | null;
  lastEssay: EssaySummary | null;
  feedGoal: { done: number; target: number };
  weekStreakDays: number;
  weekTheme: string;
}

export interface StudentSession {
  email: string;
  studentName: string;
  isMinor: boolean;
}
