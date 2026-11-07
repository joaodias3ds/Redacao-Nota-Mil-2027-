'use client';

import Link from 'next/link';
import { usePortalData } from '@/components/portal/portal-context';

export default function TeacherDashboardPage() {
  const data = usePortalData();
  return (
    <>
      <p className="eyebrow">Área do professor</p>
      <h1>Resumo</h1>
      <section className="card">
        <h2>{data.me.fullName}</h2>
        <p>Você vê {data.classes.length} turma(s) em que leciona e {data.enrollments.length} matrícula(s) dessas turmas. Alunos de outras turmas não aparecem.</p>
        <p><Link href="/teacher/turmas">Abrir minhas turmas</Link></p>
      </section>
    </>
  );
}
