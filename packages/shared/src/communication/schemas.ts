import { z } from 'zod';

export const noticeTargetEnum = z.enum(['ALL', 'CLASS_GROUP', 'STUDENTS', 'GUARDIANS', 'TEACHERS']);

export const noticeCreateSchema = z.object({
  title: z.string().trim().min(3).max(150),
  content: z.string().trim().min(5).max(5000),
  target: noticeTargetEnum,
  classGroupId: z.string().uuid().optional(),
}).strict();

export type NoticeTarget = z.infer<typeof noticeTargetEnum>;
export type NoticeCreate = z.infer<typeof noticeCreateSchema>;

