import { z } from 'zod';
import { studentLevels } from '../people/schemas.js';

export const enrollmentStatuses = ['draft', 'submitted', 'active', 'waitlist', 'cancelled'] as const;
export const enrollmentStepSchemas = {
  1: z.object({ contactEmail: z.email() }).strict(),
  2: z.object({ studentId: z.uuid() }).strict(),
  3: z.object({ studentLevel: studentLevels }).strict(),
  4: z.object({ guardianIds: z.array(z.uuid()) }).strict(),
  5: z.object({ classGroupId: z.uuid() }).strict(),
  6: z.object({ referralCode: z.string().trim().max(80).optional(), notes: z.string().trim().max(500).optional() }).strict(),
  7: z.object({ documentReferences: z.array(z.string().max(200)).default([]), authorizationReferences: z.array(z.string().max(200)).default([]) }).strict(),
  8: z.object({ confirmed: z.literal(true) }).strict(),
} as const;
export type EnrollmentStep = keyof typeof enrollmentStepSchemas;
export type EnrollmentDraftData = Partial<Record<`${EnrollmentStep}`, unknown>>;

export function parseEnrollmentStep(step: number, value: unknown): unknown {
  const schema = enrollmentStepSchemas[step as EnrollmentStep];
  if (!schema) throw new Error('Etapa de matrícula inexistente.');
  return schema.parse(value);
}
