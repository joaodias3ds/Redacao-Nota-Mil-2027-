import { createStudentApi } from '@nota-mil/shared/student';

/**
 * Mesma API do Web (Next).
 * Emulador Android: use 10.0.2.2:3001
 * Celular físico: IP da máquina na LAN
 */
export const studentApi = createStudentApi(
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001',
);

export function countEssayLines(text: string) {
  return Math.max(1, text.split(/\n/).length + Math.floor(text.length / 70));
}
