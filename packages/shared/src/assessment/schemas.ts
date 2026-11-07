import { z } from 'zod';

export const essayCompetencyScore = z.number().int().min(0).max(200).refine((val) => val % 40 === 0, {
  message: 'As notas das competências ENEM devem ser múltiplos de 40 (0, 40, 80, 120, 160, 200).',
});

export const essayEvaluationSchema = z.object({
  essayId: z.string().uuid(),
  competency1: essayCompetencyScore,
  competency2: essayCompetencyScore,
  competency3: essayCompetencyScore,
  competency4: essayCompetencyScore,
  competency5: essayCompetencyScore,
  feedbackComments: z.string().trim().max(3000).optional(),
}).strict();

export const essaySubmissionSchema = z.object({
  studentId: z.string().uuid(),
  theme: z.string().trim().min(3).max(200),
  fileReference: z.string().optional(),
  textContent: z.string().trim().max(10000).optional(),
}).strict();

export type EssayEvaluation = z.infer<typeof essayEvaluationSchema>;
export type EssaySubmission = z.infer<typeof essaySubmissionSchema>;

