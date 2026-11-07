'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { getSupabase, roleHome } from '@/lib/supabase';

export type Me = {
  userId: string;
  personId: string;
  fullName: string;
  activeRole: string;
  roles: string[];
  temporaryAccess: { viewAsStudentId: string; expiresAt: string } | null;
};

export type EnrollmentRow = {
  id: string;
  studentId: string;
  studentName: string;
  classGroupId: string;
  classGroupName: string;
  status: string;
};

export type ClassRow = { id: string; name: string; teacherId: string; capacity: number | null };

export type LinkedStudent = {
  studentId: string;
  fullName: string;
  pedagogical: boolean;
  financial: boolean;
  adultAuthorized: boolean;
};

export type PortalData = {
  token: string;
  me: Me;
  enrollments: EnrollmentRow[];
  classes: ClassRow[];
  links: LinkedStudent[];
  warnings: string[];
  signOut: () => Promise<void>;
  switchRole: (role: string) => Promise<void>;
};

export function usePortal(allow: readonly string[]) {
  const router = useRouter();
  const allowKey = allow.join(',');
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setError('Configure o acesso do Supabase para entrar.');
      setLoading(false);
      return;
    }
    let cancel = false;
    supabase.auth.getSession().then(async ({ data: session }) => {
      const token = session.session?.access_token;
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const me = await apiRequest<{ data: Me }>('/v1/me', token, '');
        const role = me.data.activeRole;
        if (!allowKey.split(',').includes(role)) {
          router.replace(roleHome[role] ?? '/login');
          return;
        }
        const accessToken = token;
        const warnings: string[] = [];
        async function loadList<T>(path: string): Promise<T[]> {
          try {
            const body = await apiRequest<{ data: T[] }>(path, accessToken, role);
            return body.data;
          } catch (cause) {
            warnings.push(cause instanceof Error ? cause.message : 'Não foi possível carregar uma lista.');
            return [];
          }
        }
        const [enrollments, classes, links] = await Promise.all([
          loadList<EnrollmentRow>('/v1/enrollments'),
          loadList<ClassRow>('/v1/class-groups'),
          role === 'RESPONSAVEL' ? loadList<LinkedStudent>('/v1/me/linked-students') : Promise.resolve([] as LinkedStudent[]),
        ]);
        if (cancel) return;
        setData({
          token: accessToken,
          me: me.data,
          enrollments,
          classes,
          links,
          warnings,
          signOut: async () => {
            await supabase.auth.signOut();
            router.replace('/login');
          },
          switchRole: async (next) => {
            await apiRequest('/v1/me/active-role', accessToken, role, { method: 'PUT', body: JSON.stringify({ role: next }) });
            window.location.assign(roleHome[next] ?? '/login');
          },
        });
      } catch (cause) {
        if (!cancel) setError(cause instanceof Error ? cause.message : 'Não foi possível abrir esta área.');
      } finally {
        if (!cancel) setLoading(false);
      }
    });
    return () => { cancel = true; };
  }, [allowKey, router]);

  return { data, error, loading };
}
