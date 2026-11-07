/** Nomes das variáveis — valores vêm do ambiente do servidor. */
export const serverEnvKeys = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'GEMINI_API_KEY',
  'GOOGLE_GMAIL_CURSO_CLIENT_ID',
  'GOOGLE_GMAIL_CURSO_CLIENT_SECRET',
  'GOOGLE_GMAIL_CURSO_REFRESH_TOKEN',
  'GOOGLE_GMAIL_ADMIN_CLIENT_ID',
  'GOOGLE_GMAIL_ADMIN_CLIENT_SECRET',
  'GOOGLE_GMAIL_ADMIN_REFRESH_TOKEN',
  'GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE',
  'GOOGLE_SHEETS_SPREADSHEET_ID',
] as const;

export type ServerEnvKey = (typeof serverEnvKeys)[number];

export function assertServerEnv(keys: ServerEnvKey[] = [...serverEnvKeys]) {
  const missing = keys.filter((k) => !process.env[k] || process.env[k]?.includes('SUBSTITUA'));
  if (missing.length) {
    throw new Error(`Variáveis de ambiente ausentes ou placeholder: ${missing.join(', ')}`);
  }
}
