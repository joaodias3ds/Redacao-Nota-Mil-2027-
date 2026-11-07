import { z } from 'zod';

export const attendanceStatusEnum = z.enum(['PRESENT', 'ABSENT', 'JUSTIFIED']);

export const attendanceRecordSchema = z.object({
  lessonId: z.string().uuid(),
  studentId: z.string().uuid(),
  status: attendanceStatusEnum,
  essayDelivered: z.boolean().default(false),
  justificationReason: z.string().trim().max(500).optional(),
}).strict();

export const offlineAttendanceSyncItemSchema = z.object({
  operationId: z.string().uuid(),
  lessonId: z.string().uuid(),
  studentId: z.string().uuid(),
  status: attendanceStatusEnum,
  essayDelivered: z.boolean(),
  baseVersion: z.number().int().nonnegative(),
  timestamp: z.string(),
}).strict();

export type AttendanceStatus = z.infer<typeof attendanceStatusEnum>;
export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;
export type OfflineAttendanceSyncItem = z.infer<typeof offlineAttendanceSyncItemSchema>;

