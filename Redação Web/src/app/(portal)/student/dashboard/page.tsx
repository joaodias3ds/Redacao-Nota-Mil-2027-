'use client';

import Link from 'next/link';
import { usePortalData } from '@/components/portal/portal-context';
import { enrollmentStatus, subjectStudentId } from '@/lib/labels';

export default function StudentDashboardPage() {
  const data = usePortalData();
  const subject = subjectStudentId(data.me.personId, data.me.activeRole, data.me.temporaryAccess?.viewAsStudentId);
  const mine = data.enrollments.filter((row) => row.studentId === subject);
  return (
    <>
      <p className="eyebrow">Área do aluno</p>
      <h1>Resumo</h1>
      <section className="card">
        <h2>{data.me.activeRole === 'ACESSO_TEMPORARIO' ? 'Aluno em visualização' : data.me.fullName}</h2>
        <p>Esta conta vê somente os próprios dados. Notas e redações entram aqui quando a correção for publicada.</p>
        <p>{mine.length === 0 ? 'Nenhuma matrícula encontrada.' : `${mine.length} matrícula(s) nesta consulta.`}</p>
        <ul className="record-list">
          {mine.slice(0, 3).map((row) => (
            <li key={row.id}><div><strong>{row.classGroupName}</strong><small>{enrollmentStatus(row.status)}</small></div></li>
          ))}
        </ul>
        <p><Link href="/student/matriculas">Ver matrículas</Link> · <Link href="/student/cadastro">Ver cadastro</Link></p>
      </section>
    </>
  );
}
