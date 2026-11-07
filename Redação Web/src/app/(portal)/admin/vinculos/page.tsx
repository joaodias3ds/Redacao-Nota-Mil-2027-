'use client';

import { useEffect, useState } from 'react';
import { apiRequest, type Person } from '@/lib/api';
import { usePortal } from '@/components/portal/use-portal';
import { relationshipError } from '@/lib/validation';

type GuardianLink = {
  id: string;
  studentName: string;
  guardianName: string;
  relationship: string;
  pedagogical: boolean;
  financial: boolean;
  adultAuthorized: boolean;
};

export default function GuardianLinksPage() {
  const portal = usePortal(['ADMIN']);
  const [people, setPeople] = useState<Person[]>([]);
  const [links, setLinks] = useState<GuardianLink[]>([]);
  const [studentId, setStudentId] = useState('');
  const [guardianId, setGuardianId] = useState('');
  const [relationship, setRelationship] = useState('');
  const [pedagogical, setPedagogical] = useState(true);
  const [financial, setFinancial] = useState(false);
  const [adultAuthorized, setAdultAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function load(token: string) {
    setError('');
    const [personResult, linkResult] = await Promise.all([
      apiRequest<{ data: Person[] }>('/v1/people?limit=50', token, 'ADMIN'),
      apiRequest<{ data: GuardianLink[] }>('/v1/guardian-links', token, 'ADMIN'),
    ]);
    setPeople(personResult.data);
    setLinks(linkResult.data);
  }

  useEffect(() => {
    if (!portal.data) return;
    void load(portal.data.token).catch((cause) => setError(cause instanceof Error ? cause.message : 'Não foi possível carregar os vínculos.'));
  }, [portal.data?.token]);

  async function addLink(event: React.FormEvent) {
    event.preventDefault();
    if (!portal.data) return;
    const invalid = relationshipError(relationship);
    if (invalid || !studentId || !guardianId) {
      setError(invalid ?? 'Selecione o aluno e o responsável.');
      return;
    }
    if (studentId === guardianId) {
      setError('Aluno e responsável devem ser pessoas diferentes.');
      return;
    }
    setError('');
    setNotice('');
    try {
      await apiRequest('/v1/guardian-links', portal.data.token, 'ADMIN', {
        method: 'POST',
        body: JSON.stringify({ studentId, guardianId, relationship: relationship.trim(), pedagogical, financial, adultAuthorized }),
      });
      setRelationship('');
      setNotice('Vínculo cadastrado.');
      await load(portal.data.token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível criar o vínculo.');
    }
  }

  async function revokeLink(id: string) {
    if (!portal.data || !window.confirm('Revogar este vínculo? O acesso associado será interrompido.')) return;
    setError('');
    try {
      await apiRequest(`/v1/guardian-links/${id}`, portal.data.token, 'ADMIN', { method: 'DELETE' });
      setNotice('Vínculo revogado.');
      await load(portal.data.token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível revogar o vínculo.');
    }
  }

  const students = people.filter((person) => person.roles.includes('ALUNO'));
  const guardians = people.filter((person) => person.roles.includes('RESPONSAVEL'));

  return (
    <>
      <div className="topbar-header">
        <div>
          <p className="eyebrow">Secretaria</p>
          <h1>Vínculos</h1>
        </div>
      </div>
      {portal.loading && <p>Carregando a área…</p>}
      {portal.error && <p className="error" role="alert">{portal.error}</p>}
      {portal.data && (
        <section className="card">
          <h2>Responsável e aluno</h2>
          <p>O acesso pedagógico e o financeiro são permissões separadas. Os dois irmãos aparecem para o responsável quando cada um tem o próprio vínculo.</p>
          <form className="form-grid" onSubmit={addLink}>
            <label>Aluno
              <select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
                <option value="">Selecione</option>
                {students.map((person) => <option value={person.id} key={person.id}>{person.name}</option>)}
              </select>
            </label>
            <label>Responsável
              <select value={guardianId} onChange={(event) => setGuardianId(event.target.value)}>
                <option value="">Selecione</option>
                {guardians.map((person) => <option value={person.id} key={person.id}>{person.name}</option>)}
              </select>
            </label>
            <label>Parentesco<input value={relationship} onChange={(event) => setRelationship(event.target.value)} maxLength={80} /></label>
            <div className="choice-row">
              <label><input type="checkbox" checked={pedagogical} onChange={(event) => setPedagogical(event.target.checked)} /> Acesso pedagógico</label>
              <label><input type="checkbox" checked={financial} onChange={(event) => setFinancial(event.target.checked)} /> Acesso financeiro</label>
              <label><input type="checkbox" checked={adultAuthorized} onChange={(event) => setAdultAuthorized(event.target.checked)} /> Aluno maior autorizou a consulta</label>
            </div>
            <button className="primary" type="submit">Criar vínculo</button>
          </form>
          {error && <p className="error" role="alert">{error}</p>}
          {notice && <p className="success" role="status">{notice}</p>}
          {links.length === 0 ? <p>Nenhum vínculo ativo.</p> : (
            <ul className="record-list">
              {links.map((link) => (
                <li key={link.id}>
                  <div>
                    <strong>{link.guardianName} → {link.studentName}</strong>
                    <small>{link.relationship} · {link.pedagogical ? 'Pedagógico' : 'Sem acesso pedagógico'} · {link.financial ? 'Financeiro' : 'Sem acesso financeiro'}{link.adultAuthorized ? ' · autorizado pelo aluno maior' : ''}</small>
                  </div>
                  <button className="secondary" type="button" onClick={() => void revokeLink(link.id)}>Revogar</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
