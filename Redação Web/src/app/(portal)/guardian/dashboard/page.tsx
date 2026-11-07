'use client';

import Link from 'next/link';
import { usePortalData } from '@/components/portal/portal-context';

export default function GuardianDashboardPage() {
  const data = usePortalData();
  return (
    <>
      <p className="eyebrow">Área do responsável</p>
      <h1>Resumo</h1>
      <section className="card">
        <h2>{data.me.fullName}</h2>
        <p>{data.links.length === 0 ? 'Nenhum aluno está vinculado a esta conta. A secretaria precisa autorizar o acesso.' : `Você acompanha ${data.links.length} aluno(s). Cada irmão aparece quando o vínculo pedagógico está ativo.`}</p>
        <ul className="record-list">
          {data.links.map((link) => (
            <li key={link.studentId}><div><strong>{link.fullName}</strong><small>{link.pedagogical ? 'Pedagógico liberado' : 'Sem acesso pedagógico'} · {link.financial ? 'Financeiro liberado' : 'Sem acesso financeiro'}</small></div></li>
          ))}
        </ul>
        <p><Link href="/guardian/filhos">Abrir os filhos</Link></p>
      </section>
    </>
  );
}
