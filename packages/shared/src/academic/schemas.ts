import { z } from 'zod';

export const classGroupCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  teacherId: z.string().uuid(),
  capacity: z.number().int().positive(),
}).strict();

export const classGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  teacherId: z.string().uuid(),
  capacity: z.number().int().nullable().optional(),
});

export const lessonSchema = z.object({
  id: z.string().uuid(),
  classGroupId: z.string().uuid(),
  date: z.string(),
  topic: z.string().trim().max(200).optional(),
});

export type ClassGroupCreate = z.infer<typeof classGroupCreateSchema>;
export type ClassGroup = z.infer<typeof classGroupSchema>;
export type Lesson = z.infer<typeof lessonSchema>;

