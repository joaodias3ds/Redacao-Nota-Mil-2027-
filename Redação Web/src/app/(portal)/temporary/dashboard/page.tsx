'use client';

import { usePortalData } from '@/components/portal/portal-context';
import { enrollmentStatus } from '@/lib/labels';

export default function TemporaryDashboardPage() {
  const data = usePortalData();
  const until = data.me.temporaryAccess
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(data.me.temporaryAccess.expiresAt))
    : null;
  return (
    <>
      <p className="eyebrow">Acesso temporário</p>
      <h1>Visão do aluno</h1>
      <section className="card">
        <h2>Somente leitura</h2>
        <p>{until ? `Este acesso vale até ${until}.` : 'Não há vigência registrada para este acesso.'} Nada é alterado por aqui. A lista mostra só o aluno autorizado para esta sessão.</p>
        {data.enrollments.length === 0 ? <p>Nenhuma matrícula encontrada para o aluno desta sessão.</p> : (
          <ul className="record-list">
            {data.enrollments.map((row) => (
              <li key={row.id}><div><strong>{row.studentName} · {row.classGroupName}</strong><small>{enrollmentStatus(row.status)}</small></div></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
