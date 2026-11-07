import { useEffect, useState } from 'react';
import { mobileApi, supabase } from './session';

export type Me = { personId: string; fullName: string; activeRole: string; roles: string[] };
export type EnrollmentRow = { id: string; studentId: string; studentName: string; classGroupId: string; classGroupName: string; status: string };
export type ClassRow = { id: string; name: string };
export type LinkedStudent = { studentId: string; fullName: string; pedagogical: boolean; financial: boolean };

export function useArea(allow: string[]) {
  const allowKey = allow.join(',');
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [links, setLinks] = useState<LinkedStudent[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setError('Configure o Supabase do aplicativo.');
      setLoading(false);
      return;
    }
    let cancel = false;
    supabase.auth.getSession().then(async ({ data }) => {
      const access = data.session?.access_token;
      if (!access) {
        setError('Entre novamente.');
        setLoading(false);
        return;
      }
      try {
        const profile = await mobileApi<{ data: Me }>('/v1/me', access);
        if (!allowKey.split(',').includes(profile.data.activeRole)) {
          setError('Esta área não é do seu perfil.');
          setLoading(false);
          return;
        }
        const role = profile.data.activeRole;
        const [enrollmentBody, classBody, linkBody] = await Promise.all([
          mobileApi<{ data: EnrollmentRow[] }>('/v1/enrollments', access, role).catch(() => ({ data: [] })),
          mobileApi<{ data: ClassRow[] }>('/v1/class-groups', access, role).catch(() => ({ data: [] })),
          role === 'RESPONSAVEL' ? mobileApi<{ data: LinkedStudent[] }>('/v1/me/linked-students', access, role) : Promise.resolve({ data: [] as LinkedStudent[] }),
        ]);
        if (cancel) return;
        setToken(access);
        setMe(profile.data);
        setEnrollments(enrollmentBody.data);
        setClasses(classBody.data);
        setLinks(linkBody.data);
      } catch (cause) {
        if (!cancel) setError(cause instanceof Error ? cause.message : 'Sem conexão.');
      } finally {
        if (!cancel) setLoading(false);
      }
    });
    return () => { cancel = true; };
  }, [allowKey]);

  return { token, me, enrollments, classes, links, error, loading, signOut: () => supabase?.auth.signOut() };
}
