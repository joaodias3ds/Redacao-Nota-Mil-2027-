'use client';

import { useEffect, useState } from 'react';
import { EnrollmentSection } from '@/app/EnrollmentSection';
import { apiRequest, type Person } from '@/lib/api';
import { usePortal } from '@/components/portal/use-portal';

export default function EnrollmentsPage() {
  const portal = usePortal(['ADMIN']);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!portal.data) return;
    apiRequest<{ data: Person[] }>('/v1/people?limit=50', portal.data.token, 'ADMIN')
      .then((result) => setPeople(result.data))
      .catch((cause) => setError(cause instanceof Error ? cause.message : 'Não foi possível carregar os alunos.'));
  }, [portal.data?.token]);

  return (
    <>
      <div className="topbar-header">
        <div>
          <p className="eyebrow">Secretaria</p>
          <h1>Matrículas</h1>
        </div>
      </div>
      {portal.loading && <p>Carregando a área…</p>}
      {portal.error && <p className="error" role="alert">{portal.error}</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {portal.data && <EnrollmentSection token={portal.data.token} people={people} />}
    </>
  );
}
