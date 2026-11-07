import { createStudentApi } from '@nota-mil/shared/student';

/** Mesma API usada pelo Mobile — Next em :3001. */
export const studentApi = createStudentApi(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
);

export function countEssayLines(text: string) {
  return Math.max(1, text.split(/\n/).length + Math.floor(text.length / 70));
}
