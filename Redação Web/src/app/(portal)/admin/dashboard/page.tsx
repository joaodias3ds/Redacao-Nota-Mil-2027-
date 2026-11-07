'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { usePortal } from '@/components/portal/use-portal';

type Integration = { id: string; status: string; detail: string };

const statusLabel: Record<string, string> = {
  'configured-when-env-present': 'Depende da configuração',
  'in-use': 'Em uso',
  planned: 'Planejada',
  partial: 'Parcial',
};

export default function AdminDashboardPage() {
  const portal = usePortal(['ADMIN']);
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    if (!portal.data) return;
    apiRequest<{ data: Integration[] }>('/v1/integrations/status', portal.data.token, 'ADMIN')
      .then((result) => setIntegrations(result.data))
      .catch(() => setIntegrations([]));
  }, [portal.data?.token]);

  return (
    <>
      <div className="topbar-header">
        <div>
          <p className="eyebrow">Secretaria</p>
          <h1>Painel</h1>
        </div>
      </div>
      {portal.loading && <p>Carregando a área…</p>}
      {portal.error && <p className="error" role="alert">{portal.error}</p>}
      {portal.data && (
        <>
          <section className="card">
            <h2>Olá, {portal.data.me.fullName}</h2>
            <p>Nesta consulta há {portal.data.classes.length} turma(s) e {portal.data.enrollments.length} matrícula(s). A lista da API traz até 100 registros, então isto não é um total inventado.</p>
          </section>
          <div className="module-grid">
            <Link className="module-card" href="/admin/pessoas"><strong>Pessoas</strong><span>Cadastro de aluno, professor e responsável.</span></Link>
            <Link className="module-card" href="/admin/vinculos"><strong>Vínculos</strong><span>Quem pode ver cada aluno, inclusive os dois irmãos.</span></Link>
            <Link className="module-card" href="/admin/turmas"><strong>Turmas</strong><span>Nome, professor e capacidade.</span></Link>
            <Link className="module-card" href="/admin/matriculas"><strong>Matrículas</strong><span>Rascunho, envio e aprovação da secretaria.</span></Link>
          </div>
          <section className="card">
            <h2>Integrações</h2>
            <p>O status abaixo vem da API. Planejada significa que o canal ainda não está ligado.</p>
            <ul className="record-list">
              {integrations.map((item) => (
                <li key={item.id}><div><strong>{item.id}</strong><small>{statusLabel[item.status] ?? item.status}. {item.detail}</small></div></li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
