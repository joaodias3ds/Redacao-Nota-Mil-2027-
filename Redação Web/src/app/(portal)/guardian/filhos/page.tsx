'use client';

import { useState } from 'react';
import { usePortalData } from '@/components/portal/portal-context';
import { enrollmentStatus } from '@/lib/labels';

export default function GuardianChildrenPage() {
  const data = usePortalData();
  const [selectedId, setSelectedId] = useState(data.links[0]?.studentId ?? '');
  const selected = data.links.find((link) => link.studentId === selectedId) ?? data.links[0];
  const rows = data.enrollments.filter((row) => row.studentId === selected?.studentId);

  return (
    <>
      <p className="eyebrow">Área do responsável</p>
      <h1>Filhos</h1>
      <section className="card">
        <h2>Quem você acompanha</h2>
        {data.links.length === 0 ? <p>Nenhum aluno está vinculado a esta conta.</p> : (
          <div className="choice-row">
            {data.links.map((link) => (
              <button key={link.studentId} type="button" className={link.studentId === selected?.studentId ? 'primary' : 'secondary'} onClick={() => setSelectedId(link.studentId)} aria-pressed={link.studentId === selected?.studentId}>
                {link.fullName}
              </button>
            ))}
          </div>
        )}
      </section>
      {selected && (
        <section className="card">
          <h2>{selected.fullName}</h2>
          <p>{selected.pedagogical ? 'Acesso pedagógico liberado.' : 'Sem acesso pedagógico.'} {selected.financial ? 'Acesso financeiro liberado. As parcelas entram aqui quando o financeiro for publicado.' : 'Sem acesso financeiro. Mensalidade não aparece nesta conta.'}</p>
          {rows.length === 0 ? <p>Nenhuma matrícula deste aluno.</p> : (
            <ul className="record-list">
              {rows.map((row) => <li key={row.id}><div><strong>{row.classGroupName}</strong><small>{enrollmentStatus(row.status)}</small></div></li>)}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
