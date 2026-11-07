import 'react-native-url-polyfill/auto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const storage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

export const supabase: SupabaseClient | null = url && key
  ? createClient(url, key, { auth: { storage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false } })
  : null;

export const rolePath: Record<string, string> = {
  ADMIN: '/(portal)/admin',
  PROFESSOR: '/(portal)/teacher',
  ALUNO: '/(portal)/student',
  RESPONSAVEL: '/(portal)/guardian',
  ACESSO_TEMPORARIO: '/(portal)/temporary',
};

export async function mobileApi<T>(path: string, token: string, role = ''): Promise<T> {
  const base = process.env.EXPO_PUBLIC_API_URL;
  if (!base) throw new Error('Configure EXPO_PUBLIC_API_URL.');
  const response = await fetch(`${base}${path}`, {
    headers: { authorization: `Bearer ${token}`, ...(role ? { 'x-active-role': role } : {}), 'content-type': 'application/json' },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? 'Não foi possível carregar.');
  return body as T;
}

export function loginError(email: string, password: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Informe um e-mail válido.';
  if (password.length < 8) return 'A senha precisa ter pelo menos 8 caracteres.';
  return null;
}
