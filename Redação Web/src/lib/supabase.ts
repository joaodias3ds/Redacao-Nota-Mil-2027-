import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}

export const roleHome: Record<string, string> = {
  ADMIN: '/admin/dashboard',
  PROFESSOR: '/teacher/dashboard',
  ALUNO: '/student/dashboard',
  RESPONSAVEL: '/guardian/dashboard',
  ACESSO_TEMPORARIO: '/temporary/dashboard',
};

export const roleLabel: Record<string, string> = {
  ADMIN: 'Secretaria',
  PROFESSOR: 'Professor',
  ALUNO: 'Aluno',
  RESPONSAVEL: 'Responsável',
  ACESSO_TEMPORARIO: 'Acesso temporário',
};
