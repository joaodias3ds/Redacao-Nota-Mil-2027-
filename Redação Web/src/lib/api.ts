export type Person = { id: string; name: string; birthDate: string | null; email: string | null; phone: string | null; cpf: string | null; studentLevel: string | null; version: number; roles: string[] };

export async function apiRequest<T>(path: string, token: string, role: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error('Configure NEXT_PUBLIC_API_URL.');
  const response = await fetch(`${base}${path}`, { ...init, cache: 'no-store', headers: { authorization: `Bearer ${token}`, ...(role ? { 'x-active-role': role } : {}), 'content-type': 'application/json', ...init?.headers } });
  if (response.status === 204) return undefined as T;
  const data = await response.json();
  if (!response.ok) throw new Error(data.message ?? 'Não foi possível carregar os dados.');
  return data as T;
}
