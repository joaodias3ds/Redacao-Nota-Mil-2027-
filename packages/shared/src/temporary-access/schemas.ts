import { z } from 'zod';

export const temporaryAccessGrantSchema = z.object({
  userId: z.string().uuid(),
  viewAsStudentId: z.string().uuid(),
  reason: z.string().trim().min(8).max(500),
}).strict();

export const temporaryAccessRevokeSchema = z.object({
  id: z.string().uuid(),
}).strict();

export type TemporaryAccessGrant = z.infer<typeof temporaryAccessGrantSchema>;
export type TemporaryAccessRevoke = z.infer<typeof temporaryAccessRevokeSchema>;

