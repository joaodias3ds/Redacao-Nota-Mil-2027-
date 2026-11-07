'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiRequest, type Person } from '@/lib/api';
import { usePortal } from '@/components/portal/use-portal';
import { roleLabel } from '@/lib/supabase';
import { personNameError } from '@/lib/validation';

export default function PeoplePage() {
  const portal = usePortal(['ADMIN']);
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState<'ALUNO' | 'PROFESSOR' | 'RESPONSAVEL'>('ALUNO');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadPeople(token: string) {
    setLoading(true);
    setError('');
    try {
      const result = await apiRequest<{ data: Person[] }>('/v1/people?limit=50', token, 'ADMIN');
      setPeople(result.data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível carregar as pessoas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (portal.data) void loadPeople(portal.data.token);
  }, [portal.data?.token]);

  async function addPerson(event: React.FormEvent) {
    event.preventDefault();
    if (!portal.data) return;
    const invalid = personNameError(name);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError('');
    setNotice('');
    try {
      await apiRequest('/v1/people', portal.data.token, 'ADMIN', {
        method: 'POST',
        headers: { 'idempotency-key': crypto.randomUUID() },
        body: JSON.stringify({ name: name.trim(), birthDate: birthDate || undefined, roles: [role] }),
      });
      setName('');
      setBirthDate('');
      setNotice('Pessoa cadastrada.');
      await loadPeople(portal.data.token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível cadastrar.');
    }
  }

  return (
    <>
      <div className="topbar-header">
        <div>
          <p className="eyebrow">Secretaria</p>
          <h1>Pessoas</h1>
        </div>
      </div>
      {portal.loading && <p>Carregando a área…</p>}
      {portal.error && <p className="error" role="alert">{portal.error}</p>}
      {portal.data && (
        <>
          <section className="card">
            <h2>Cadastrar pessoa</h2>
            <p>Nome e perfil entram agora. Conta de acesso e vínculos ficam nos módulos seguintes.</p>
            <form className="form-grid" onSubmit={addPerson}>
              <label>Nome completo<input value={name} onChange={(event) => setName(event.target.value)} maxLength={160} autoComplete="name" /></label>
              <label>Perfil
                <select value={role} onChange={(event) => setRole(event.target.value as typeof role)}>
                  <option value="ALUNO">Aluno</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="RESPONSAVEL">Responsável</option>
                </select>
              </label>
              <label>Data de nascimento<input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} /></label>
              <button type="submit" className="primary">Cadastrar pessoa</button>
            </form>
          </section>
          <section className="card">
            <h2>Cadastros desta página</h2>
            <p>A lista traz até 50 pessoas. O aluno abre o próprio prontuário.</p>
            {error && <p className="error" role="alert">{error}</p>}
            {notice && <p className="success" role="status">{notice}</p>}
            {loading ? <p>Carregando cadastros…</p> : people.length === 0 ? <p>Nenhuma pessoa encontrada.</p> : (
              <ul className="record-list">
                {people.map((person) => (
                  <li key={person.id}>
                    <div>
                      {person.roles.includes('ALUNO') ? <Link href={`/admin/students/${person.id}`}><strong>{person.name}</strong></Link> : <strong>{person.name}</strong>}
                      <small>{person.roles.map((item) => roleLabel[item] ?? item).join(', ')}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}
