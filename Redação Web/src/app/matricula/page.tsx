'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { apiRequest } from '@/lib/api';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key) : null;
type Group = { id: string; name: string; capacity: number | null };
type Enrollment = { id: string; studentId: string; classGroupId: string; status: string; step: number; version: number; draftData: Record<string, unknown> };

export default function MatriculaPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianId, setGuardianId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [relationship, setRelationship] = useState('');
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupId, setGroupId] = useState('');
  const [draft, setDraft] = useState<Enrollment | null>(null);
  const [level, setLevel] = useState('ENSINO_MEDIO');
  const [referral, setReferral] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => { setToken(data.session?.access_token ?? null); setEmail(data.session?.user.email ?? ''); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { setToken(session?.access_token ?? null); setEmail(session?.user.email ?? ''); });
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!token) return;
    void apiRequest<{ data: { guardianId: string; students: { id: string; name: string }[] } }>('/v1/onboarding/me', token, 'RESPONSAVEL')
      .then((result) => { setGuardianId(result.data.guardianId); setStudents(result.data.students); if (result.data.students.length === 1) setStudentId(result.data.students[0].id); })
      .catch(() => {});
    void Promise.all([
      apiRequest<{ data: Group[] }>('/v1/class-groups', token, 'RESPONSAVEL'),
      apiRequest<{ data: Enrollment[] }>('/v1/enrollments', token, 'RESPONSAVEL'),
      apiRequest<{ verified: boolean }>('/v1/enrollment-email/status', token, 'RESPONSAVEL'),
    ]).then(([g, e, v]) => { setGroups(g.data); setDraft(e.data.find((row) => row.status === 'draft') ?? null); setVerified(v.verified); }).catch(() => {});
  }, [token]);

  async function run(action: () => Promise<void>) {
    setError(''); setNotice('');
    try { await action(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível concluir a operação.'); }
  }
  async function authenticate(event: FormEvent, create: boolean) {
    event.preventDefault();
    await run(async () => {
      if (!supabase) return;
      const result = create ? await supabase.auth.signUp({ email, password }) : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) throw new Error('Confira o e-mail e a senha informados.');
      setNotice(create ? 'Conta criada. Confirme o e-mail recebido e entre para continuar.' : 'Acesso autorizado.');
    });
  }
  async function onboard(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const result = await apiRequest<{ data: { personId: string } }>('/v1/onboarding/guardian', token!, 'RESPONSAVEL', { method: 'POST', body: JSON.stringify({ name: guardianName }) });
      setGuardianId(result.data.personId); setNotice('Cadastro do responsável salvo.');
    });
  }
  async function addStudent(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const result = await apiRequest<{ data: { studentId: string } }>('/v1/onboarding/students', token!, 'RESPONSAVEL', { method: 'POST', headers: { 'idempotency-key': crypto.randomUUID() }, body: JSON.stringify({ name: studentName, birthDate, relationship }) });
      setStudentId(result.data.studentId); setStudents((current) => [...current, { id: result.data.studentId, name: studentName }]); setNotice('Aluno menor cadastrado.');
    });
  }
  async function start(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const result = await apiRequest<{ data: Enrollment }>('/v1/enrollments/drafts', token!, 'RESPONSAVEL', { method: 'POST', headers: { 'idempotency-key': crypto.randomUUID() }, body: JSON.stringify({ studentId, classGroupId: groupId }) });
      setDraft(result.data); setNotice('Matrícula iniciada.');
    });
  }
  async function save() {
    if (!draft) return;
    await run(async () => {
      const data: Record<number, unknown> = {
        1: { contactEmail: email }, 2: { studentId: draft.studentId }, 3: { studentLevel: level },
        4: { guardianIds: [guardianId] }, 5: { classGroupId: draft.classGroupId },
        6: { referralCode: referral || undefined, notes: notes || undefined },
        7: { documentReferences: [], authorizationReferences: [] }, 8: { confirmed },
      };
      const result = await apiRequest<{ data: Enrollment }>(`/v1/enrollments/${draft.id}/steps/${draft.step}`, token!, 'RESPONSAVEL', { method: 'PATCH', body: JSON.stringify({ version: draft.version, data: data[draft.step] }) });
      setDraft(result.data); setNotice('Etapa salva.');
    });
  }
  async function sendCode() { await run(async () => { await apiRequest('/v1/enrollment-email/send', token!, 'RESPONSAVEL', { method: 'POST' }); setNotice('Código enviado ao e-mail da conta.'); }); }
  async function verifyCode(event: FormEvent) { event.preventDefault(); await run(async () => { await apiRequest('/v1/enrollment-email/verify', token!, 'RESPONSAVEL', { method: 'POST', body: JSON.stringify({ code }) }); setVerified(true); setNotice('E-mail verificado.'); }); }
  async function submit() { if (!draft) return; await run(async () => { const result = await apiRequest<{ data: Enrollment }>(`/v1/enrollments/${draft.id}/submit`, token!, 'RESPONSAVEL', { method: 'POST', body: JSON.stringify({ version: draft.version }) }); setDraft(result.data); setNotice('Solicitação enviada à secretaria.'); }); }

  if (!supabase) return <main className="center"><section className="card"><h1>Matrícula indisponível</h1><p>Configure a autenticação e a API para abrir a matrícula.</p></section></main>;
  return <main className="content" style={{ maxWidth: 880, margin: 'auto' }}><header className="topbar"><div><p className="eyebrow">Redação Nota Mil</p><h1>Matrícula</h1><p>Para alunos menores, use a conta do responsável. A secretaria analisará a solicitação antes de ativar a matrícula.</p></div>{token && <button className="secondary" onClick={() => void supabase.auth.signOut()}>Sair</button>}</header>
    {error && <p className="error" role="alert">{error}</p>}{notice && <p className="success" role="status">{notice}</p>}
    {!token ? <section className="card"><h2>Conta do responsável</h2><form className="form-row"><label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required /></label><button className="primary" onClick={(e) => void authenticate(e, false)}>Entrar</button><button className="secondary" onClick={(e) => void authenticate(e, true)}>Criar conta</button></form></section> : <>
      <section className="card"><h2>1. Responsável</h2><p>Conta: {email}</p><form className="form-row" onSubmit={onboard}><label>Nome completo<input value={guardianName} onChange={(e) => setGuardianName(e.target.value)} minLength={2} required /></label><button className="primary">Salvar responsável</button></form></section>
      {guardianId && <section className="card"><h2>2. Aluno menor</h2><form className="form-row" onSubmit={addStudent}><label>Nome completo<input value={studentName} onChange={(e) => setStudentName(e.target.value)} minLength={2} required /></label><label>Nascimento<input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required /></label><label>Parentesco<input value={relationship} onChange={(e) => setRelationship(e.target.value)} required /></label><button className="primary">Salvar aluno</button></form></section>}
      {students.length > 0 && !draft && <section className="card"><h2>3. Turma</h2><form className="form-row" onSubmit={start}><label>Aluno<select value={studentId} onChange={(e) => setStudentId(e.target.value)} required><option value="">Selecione</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label>Turma<select value={groupId} onChange={(e) => setGroupId(e.target.value)} required><option value="">Selecione</option>{groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></label><button className="primary">Iniciar solicitação</button></form></section>}
      {draft?.status === 'draft' && <section className="card"><h2>4. Dados da matrícula</h2><p>Etapa {draft.step} de 9</p>{draft.step === 1 && <p>E-mail de contato: {email}</p>}{draft.step === 2 && <p>Aluno cadastrado nesta conta.</p>}{draft.step === 3 && <label>Nível escolar<select value={level} onChange={(e) => setLevel(e.target.value)}><option value="INFANTIL">Infantil</option><option value="FUNDAMENTAL_I">Fundamental I</option><option value="FUNDAMENTAL_II">Fundamental II</option><option value="ENSINO_MEDIO">Ensino Médio</option><option value="CONCLUIDO">Concluído</option></select></label>}{draft.step === 4 && <p>O responsável desta conta será vinculado à solicitação.</p>}{draft.step === 5 && <p>Turma escolhida: {groups.find((g) => g.id === draft.classGroupId)?.name}</p>}{draft.step === 6 && <><p>Planos e valores ainda serão definidos pela secretaria.</p><label>Indicação<input value={referral} onChange={(e) => setReferral(e.target.value)} /></label><label>Observações<input value={notes} onChange={(e) => setNotes(e.target.value)} /></label></>}{draft.step === 7 && <p>Documentos e termos obrigatórios serão solicitados pela secretaria após definição.</p>}{draft.step === 8 && <label className="inline-check"><input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} /> Revisei os dados da solicitação</label>}{draft.step <= 8 && <button className="primary" onClick={() => void save()}>Salvar etapa</button>}{draft.step === 9 && <><p>Confirme seu e-mail com um código para enviar à secretaria.</p><button className="secondary" onClick={() => void sendCode()}>Enviar código por e-mail</button><form className="form-row" onSubmit={verifyCode}><label>Código de seis dígitos<input inputMode="numeric" pattern="[0-9]{6}" value={code} onChange={(e) => setCode(e.target.value)} /></label><button className="secondary">Verificar código</button></form><button className="primary" disabled={!verified} onClick={() => void submit()}>Enviar à secretaria</button></>}</section>}
      {draft && draft.status !== 'draft' && <section className="card"><h2>Solicitação recebida</h2><p>Situação: {draft.status === 'submitted' ? 'em análise pela secretaria' : draft.status === 'active' ? 'matrícula ativa' : draft.status === 'waitlist' ? 'lista de espera' : draft.status}.</p></section>}
    </>}
  </main>;
}
