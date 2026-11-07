'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { apiRequest, type Person } from '@/lib/api';
import { usePortal, type EnrollmentRow } from '@/components/portal/use-portal';
import { enrollmentStatus, studentLevel } from '@/lib/labels';
import { roleLabel } from '@/lib/supabase';

export default function StudentDetailPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params);
  const portal = usePortal(['ADMIN']);
  const [person, setPerson] = useState<Person | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!portal.data) return;
    let cancel = false;
    apiRequest<{ data: Person }>(`/v1/people/${studentId}`, portal.data.token, 'ADMIN')
      .then((result) => { if (!cancel) setPerson(result.data); })
      .catch((cause) => { if (!cancel) setError(cause instanceof Error ? cause.message : 'Não foi possível abrir o cadastro.'); });
    return () => { cancel = true; };
  }, [portal.data?.token, studentId]);

  const rows = (portal.data?.enrollments ?? []).filter((row) => row.studentId === studentId);

  return (
    <>
      <p><Link href="/admin/pessoas">Voltar para pessoas</Link></p>
      <div className="topbar-header">
        <div>
          <p className="eyebrow">Prontuário</p>
          <h1>{person?.name ?? 'Cadastro do aluno'}</h1>
        </div>
      </div>
      {portal.loading && <p>Carregando a área…</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {person && (
        <div className="module-grid">
          <section className="card">
            <h2>Identificação</h2>
            <p>Perfis: {person.roles.map((role) => roleLabel[role] ?? role).join(', ')}.</p>
            <p>Nível escolar: {studentLevel(person.studentLevel)}.</p>
            <p>Nascimento: {person.birthDate ?? 'não informado'}.</p>
            <p>E-mail: {person.email ?? 'não informado'}.</p>
            <p>Telefone: {person.phone ?? 'não informado'}.</p>
          </section>
          <section className="card">
            <h2>Matrículas</h2>
            <p>A correção e a nota aparecem quando esse módulo for publicado. Nenhum resultado é calculado nesta tela.</p>
            {rows.length === 0 ? <p>Nenhuma matrícula nesta consulta.</p> : (
              <ul className="record-list">
                {rows.map((row: EnrollmentRow) => (
                  <li key={row.id}><div><strong>{row.classGroupName}</strong><small>{enrollmentStatus(row.status)}</small></div></li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </>
  );
}
