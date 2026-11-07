import { z } from 'zod';

export const fileCategoryEnum = z.enum(['ESSAY', 'MATERIAL', 'DOCUMENT', 'AVATAR']);

export const fileUploadRequestSchema = z.object({
  filename: z.string().trim().min(1).max(255),
  contentType: z.string().trim().min(3).max(100),
  sizeBytes: z.number().int().positive().max(25 * 1024 * 1024), // máx 25MB
  category: fileCategoryEnum,
}).strict();

export type FileCategory = z.infer<typeof fileCategoryEnum>;
export type FileUploadRequest = z.infer<typeof fileUploadRequestSchema>;

