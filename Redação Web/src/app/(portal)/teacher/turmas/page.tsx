'use client';

import { usePortalData } from '@/components/portal/portal-context';
import { enrollmentStatus } from '@/lib/labels';

export default function TeacherClassesPage() {
  const data = usePortalData();
  return (
    <>
      <p className="eyebrow">Área do professor</p>
      <h1>Minhas turmas</h1>
      {data.classes.length === 0 ? <section className="card"><p>Nenhuma turma está atribuída a você.</p></section> : (
        <div className="stack">
          {data.classes.map((group) => {
            const students = data.enrollments.filter((row) => row.classGroupId === group.id);
            return (
              <section className="card" key={group.id}>
                <h2>{group.name}</h2>
                <p>{students.length} matrícula(s). {group.capacity ? `Capacidade informada: ${group.capacity}.` : 'Capacidade não informada.'}</p>
                {students.length === 0 ? <p>Nenhum aluno matriculado.</p> : (
                  <ul className="record-list">
                    {students.map((row) => <li key={row.id}><div><strong>{row.studentName}</strong><small>{enrollmentStatus(row.status)}</small></div></li>)}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
