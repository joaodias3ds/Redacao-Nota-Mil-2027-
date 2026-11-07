'use client';

import { usePortalData } from '@/components/portal/portal-context';
import { enrollmentStatus, subjectStudentId } from '@/lib/labels';

export default function StudentEnrollmentsPage() {
  const data = usePortalData();
  const subject = subjectStudentId(data.me.personId, data.me.activeRole, data.me.temporaryAccess?.viewAsStudentId);
  const mine = data.enrollments.filter((row) => row.studentId === subject);
  return (
    <>
      <p className="eyebrow">Área do aluno</p>
      <h1>Matrículas</h1>
      <section className="card">
        {mine.length === 0 ? <p>Nenhuma matrícula encontrada para você.</p> : (
          <ul className="record-list">
            {mine.map((row) => (
              <li key={row.id}><div><strong>{row.classGroupName}</strong><small>{enrollmentStatus(row.status)}</small></div></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
