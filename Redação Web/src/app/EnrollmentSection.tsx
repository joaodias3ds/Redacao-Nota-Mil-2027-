'use client';

import { useEffect, useState } from 'react';
import { apiRequest, type Person } from '@/lib/api';

type ClassGroup = { id: string; name: string; teacherId: string; capacity: number | null };
type Enrollment = { id: string; studentId: string; classGroupId: string; studentName?: string; classGroupName?: string; status: string; step: number; version: number; draftData?: Record<string, unknown>; waitlistPosition?: number | null };
const stepLabels = ['Contato', 'Aluno', 'Nível escolar', 'Responsáveis', 'Turma', 'Condição comercial', 'Documentos', 'Revisão', 'Resultado'];

export function EnrollmentSection({ token, people }: { token: string; people: Person[] }) {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [draft, setDraft] = useState<Enrollment | null>(null);
  const [studentId, setStudentId] = useState('');
  const [classGroupId, setClassGroupId] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [studentLevel, setStudentLevel] = useState('ENSINO_MEDIO');
  const [guardianIds, setGuardianIds] = useState<string[]>([]);
  const [referralCode, setReferralCode] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function load() {
    try {
      const [groups, rows] = await Promise.all([
        apiRequest<{ data: ClassGroup[] }>('/v1/class-groups', token, 'ADMIN'),
        apiRequest<{ data: Enrollment[] }>('/v1/enrollments', token, 'ADMIN'),
      ]);
      setClasses(groups.data); setEnrollments(rows.data);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível carregar matrículas.'); }
  }
  useEffect(() => { void load(); }, [token]);
  async function createDraft(event: React.FormEvent) {
    event.preventDefault(); setError(''); setNotice('');
    try {
      const result = await apiRequest<{ data: Enrollment }>('/v1/enrollments/drafts', token, 'ADMIN', { method: 'POST', headers: { 'idempotency-key': crypto.randomUUID() }, body: JSON.stringify({ studentId, classGroupId }) });
      setDraft(result.data); setGuardianIds([]); setConfirmed(false); setNotice('Rascunho criado. Preencha as etapas.'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível criar o rascunho.'); }
  }
  async function openDraft(id: string) {
    setError('');
    try { const result = await apiRequest<{ data: Enrollment }>(`/v1/enrollments/${id}`, token, 'ADMIN'); setDraft(result.data); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível abrir o rascunho.'); }
  }
  function stepData(step: number): unknown {
    switch (step) {
      case 1: return { contactEmail };
      case 2: return { studentId: draft!.studentId };
      case 3: return { studentLevel };
      case 4: return { guardianIds };
      case 5: return { classGroupId: draft!.classGroupId };
      case 6: return { referralCode: referralCode || undefined, notes: notes || undefined };
      case 7: return { documentReferences: [], authorizationReferences: [] };
      case 8: return { confirmed };
      default: return {};
    }
  }
  async function saveStep() {
    if (!draft) return;
    setError(''); setNotice('');
    try {
      const result = await apiRequest<{ data: Enrollment }>(`/v1/enrollments/${draft.id}/steps/${draft.step}`, token, 'ADMIN', { method: 'PATCH', body: JSON.stringify({ version: draft.version, data: stepData(draft.step) }) });
      setDraft(result.data); setNotice('Etapa salva.'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível salvar a etapa.'); }
  }
  async function submit() {
    if (!draft) return;
    setError(''); setNotice('');
    try {
      const result = await apiRequest<{ data: Enrollment }>(`/v1/enrollments/${draft.id}/submit`, token, 'ADMIN', { method: 'POST', body: JSON.stringify({ version: draft.version }) });
      setDraft(result.data); setNotice('Solicitação enviada à secretaria.'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível enviar a matrícula.'); }
  }
  async function approve(row: Enrollment) {
    setError(''); setNotice('');
    try {
      const result = await apiRequest<{ data: Enrollment }>(`/v1/enrollments/${row.id}/approve`, token, 'ADMIN', { method: 'POST', body: JSON.stringify({ version: row.version }) });
      setNotice(result.data.status === 'active' ? 'Matrícula aprovada e ativa.' : 'Turma cheia. Solicitação colocada em espera.');
      if (draft?.id === row.id) setDraft(result.data);
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível aprovar a matrícula.'); }
  }

  return <section className="card"><div className="section-heading"><div><h2>Matrículas assistidas</h2><p>Ativação após aprovação da secretaria. Nenhuma cobrança ou reserva temporária é criada. Documentos e termos obrigatórios aguardam definição.</p></div></div>
    {error && <p className="error" role="alert">{error}</p>}{notice && <p className="success" role="status">{notice}</p>}
    <p>A turma é cadastrada no módulo Turmas. Aqui a secretaria só inicia e acompanha a matrícula.</p>
    <form className="form-row" onSubmit={createDraft}><label>Aluno<select value={studentId} onChange={(event) => setStudentId(event.target.value)} required><option value="">Selecione</option>{people.filter((person) => person.roles.includes('ALUNO')).map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label><label>Turma<select value={classGroupId} onChange={(event) => setClassGroupId(event.target.value)} required><option value="">Selecione</option>{classes.map((group) => <option key={group.id} value={group.id}>{group.name} · {group.capacity ?? 'sem capacidade'} vagas</option>)}</select></label><button className="primary" type="submit">Iniciar matrícula</button></form>
    {draft?.status === 'draft' && <div className="wizard"><p className="eyebrow">Etapa {draft.step} de 9</p><h3>{stepLabels[draft.step - 1]}</h3>
      {draft.step === 1 && <label>E-mail de contato<input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} /></label>}
      {draft.step === 2 && <p>Aluno selecionado: {people.find((person) => person.id === draft.studentId)?.name ?? draft.studentId}</p>}
      {draft.step === 3 && <label>Nível escolar<select value={studentLevel} onChange={(event) => setStudentLevel(event.target.value)}><option value="INFANTIL">Infantil</option><option value="FUNDAMENTAL_I">Fundamental I</option><option value="FUNDAMENTAL_II">Fundamental II</option><option value="ENSINO_MEDIO">Ensino Médio</option><option value="CONCLUIDO">Concluído</option></select></label>}
      {draft.step === 4 && <div><p>Responsáveis devem estar vinculados no cadastro de pessoas.</p>{people.filter((person) => person.roles.includes('RESPONSAVEL')).map((person) => <label className="inline-check" key={person.id}><input type="checkbox" checked={guardianIds.includes(person.id)} onChange={(event) => setGuardianIds(event.target.checked ? [...guardianIds, person.id] : guardianIds.filter((id) => id !== person.id))} /> {person.name}</label>)}</div>}
      {draft.step === 5 && <p>Turma selecionada: {classes.find((group) => group.id === draft.classGroupId)?.name ?? draft.classGroupId}</p>}
      {draft.step === 6 && <><p>Planos e valores ainda não definidos. Esta etapa registra apenas referência e observações.</p><label>Código de indicação<input value={referralCode} onChange={(event) => setReferralCode(event.target.value)} /></label><label>Observações<input value={notes} onChange={(event) => setNotes(event.target.value)} /></label></>}
      {draft.step === 7 && <p>Documentos e termos obrigatórios ainda precisam de definição. Nenhum arquivo é enviado nesta versão.</p>}
      {draft.step === 8 && <label className="inline-check"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> Confirme que revisou os dados da solicitação</label>}
      {draft.step <= 8 && <button className="primary" type="button" onClick={() => void saveStep()}>Salvar etapa</button>}
      {draft.step === 9 && <button className="primary" type="button" onClick={() => void submit()}>Enviar à secretaria</button>}
    </div>}
    <ul className="people-list">{enrollments.map((row) => <li key={row.id}><div className="link-description"><strong>{row.studentName} · {row.classGroupName}</strong><small>{row.status === 'waitlist' ? `Lista de espera: posição ${row.waitlistPosition}` : row.status} · etapa {row.step}/9</small></div>{row.status === 'draft' && <button className="secondary" onClick={() => void openDraft(row.id)}>Continuar</button>}{row.status === 'submitted' && <button className="primary" onClick={() => void approve(row)}>Aprovar matrícula</button>}</li>)}</ul>
  </section>;
}
