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
  kind: string;
  competency: CompetencyId;
  title: string;
  subtitle: string;
  body: string;
  howToUse: string;
  source: string;
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
}

export const mockStudentName = 'Marina';

export const mockToday = {
  greeting: 'Bom dia',
  studentName: mockStudentName,
  draft: {
    id: 'draft-1',
    theme: 'Saúde mental dos jovens na era digital',
    text:
      'Na sociedade contemporânea, o uso intenso das redes sociais tem alterado a forma como os jovens se relacionam consigo mesmos e com os outros. Nesse contexto, a comparação constante com vidas editadas contribui para o aumento da ansiedade, o que evidencia um problema que exige atenção coletiva.',
    linesUsed: 18,
    linesMax: 30,
    minRecommended: 7,
    savedLabel: 'Salvo há 2 min',
  } satisfies EssayDraft,
  lastEssay: {
    id: 'essay-1',
    theme: 'Saúde mental dos jovens na era digital',
    statusLabel: 'Em revisão',
    version: 1,
    sentAtLabel: 'Hoje, 09:12',
    pipeline: [
      { key: 'sent', label: 'Enviada', detail: '09:12 · recebemos seu texto', done: true },
      { key: 'ai', label: 'Pré-correção da IA', detail: '09:13 · estimativa disponível', done: true },
      {
        key: 'teacher',
        label: 'Revisão do professor',
        detail: 'Em andamento · prazo de até 3 dias',
        done: false,
        current: true,
      },
      {
        key: 'official',
        label: 'Correção oficial',
        detail: 'Você será avisado quando estiver pronta',
        done: false,
      },
    ],
  },
  feedGoal: { done: 3, target: 5 },
  weekStreakDays: 4,
  weekTheme: 'Saúde mental dos jovens na era digital',
};

export const mockFeedCards: RepertoireCard[] = [
  {
    id: 'rep-bauman',
    kind: 'conceito',
    competency: 'C2',
    title: 'Modernidade líquida',
    subtitle: 'Zygmunt Bauman, 2000',
    body: 'Ideia de que vínculos, trabalho e consumo se tornaram instáveis e passageiros na sociedade contemporânea.',
    howToUse: 'Em temas sobre redes sociais, relações e consumo. Adapte ao tema, não copie a frase.',
    source: 'Bauman, Z. Modernidade líquida. 2000.',
    saved: true,
  },
  {
    id: 'rep-oms',
    kind: 'dado',
    competency: 'C2',
    title: '1 em cada 7 jovens',
    subtitle: 'OMS / saúde mental',
    body: 'Estimativas apontam que cerca de 1 em cada 7 adolescentes vive com algum transtorno mental.',
    howToUse: 'Use como dado de contextualização na introdução ou no desenvolvimento.',
    source: 'Organização Mundial da Saúde.',
    saved: false,
  },
  {
    id: 'rep-cf88',
    kind: 'lei',
    competency: 'C5',
    title: 'Art. 196 da Constituição',
    subtitle: 'CF/1988',
    body: 'A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas.',
    howToUse: 'Na proposta de intervenção, amarre agente público + política pública + detalhamento.',
    source: 'Constituição Federal de 1988, art. 196.',
    saved: false,
  },
];

export const mockPreCorrection = {
  essayId: 'essay-1',
  estimatedTotal: 760,
  maxTotal: 1000,
  disclaimer: 'A nota oficial vem do professor. Esta é uma estimativa da IA.',
  competencies: [
    { id: 'C1' as const, label: 'Norma culta', score: 160, max: 200 },
    {
      id: 'C2' as const,
      label: 'Tema e repertório',
      score: 120,
      max: 200,
      attention: true,
      comment: 'Seu repertório apareceu pouco desenvolvido. Que tal ligar uma ideia sociológica ao tema?',
    },
    { id: 'C3' as const, label: 'Argumentação', score: 160, max: 200 },
    { id: 'C4' as const, label: 'Coesão', score: 160, max: 200 },
    { id: 'C5' as const, label: 'Proposta de intervenção', score: 160, max: 200 },
  ],
  attention: {
    competency: 'C2' as const,
    title: 'Seu repertório apareceu pouco desenvolvido',
    body: 'Que tal ligar uma ideia sociológica ao tema?',
  },
};

export const mockEvolution = {
  latestTotal: 760,
  deltaSinceFirst: 120,
  points: [
    { id: 'R1', label: 'R1', total: 640 },
    { id: 'R2', label: 'R2', total: 680 },
    { id: 'R3', label: 'R3', total: 700 },
    { id: 'R4', label: 'R4', total: 720 },
    { id: 'R5', label: 'R5', total: 740 },
    { id: 'R6', label: 'R6', total: 760 },
  ],
  competencies: [
    { id: 'C1' as const, label: 'Norma culta', score: 160, max: 200, delta: 20 },
    { id: 'C2' as const, label: 'Tema e repertório', score: 120, max: 200, attention: true },
    { id: 'C3' as const, label: 'Argumentação', score: 160, max: 200, delta: 40 },
    { id: 'C4' as const, label: 'Coesão', score: 160, max: 200, delta: 20 },
    { id: 'C5' as const, label: 'Proposta de intervenção', score: 160, max: 200, delta: 40 },
  ],
  attendance: { present: 11, total: 12, label: '11 de 12 aulas neste mês' },
};
