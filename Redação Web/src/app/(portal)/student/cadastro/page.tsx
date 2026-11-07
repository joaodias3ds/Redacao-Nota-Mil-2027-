'use client';

import { useEffect, useState } from 'react';
import { apiRequest, type Person } from '@/lib/api';
import { usePortalData } from '@/components/portal/portal-context';
import { studentLevel, subjectStudentId } from '@/lib/labels';
import { optionalEmailError, phoneError } from '@/lib/validation';

export default function StudentProfilePage() {
  const data = usePortalData();
  const readOnly = data.me.activeRole === 'ACESSO_TEMPORARIO';
  const personId = subjectStudentId(data.me.personId, data.me.activeRole, data.me.temporaryAccess?.viewAsStudentId);
  const [person, setPerson] = useState<Person | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let cancel = false;
    apiRequest<{ data: Person }>(`/v1/people/${personId}`, data.token, data.me.activeRole)
      .then((result) => {
        if (cancel) return;
        setPerson(result.data);
        setEmail(result.data.email ?? '');
        setPhone(result.data.phone ?? '');
      })
      .catch((cause) => { if (!cancel) setError(cause instanceof Error ? cause.message : 'Não foi possível abrir o cadastro.'); });
    return () => { cancel = true; };
  }, [data.token, data.me.activeRole, personId]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!person || readOnly) return;
    const invalid = optionalEmailError(email) ?? phoneError(phone);
    if (invalid) {
      setError(invalid);
      return;
    }
    const changes: { version: number; email?: string; phone?: string } = { version: person.version };
    if (email.trim() && email.trim() !== (person.email ?? '')) changes.email = email.trim();
    if (phone.trim() && phone.trim() !== (person.phone ?? '')) changes.phone = phone.trim();
    if (!changes.email && !changes.phone) {
      setNotice('Nenhuma alteração para salvar. Para apagar um contato, fale com a secretaria.');
      setError('');
      return;
    }
    setError('');
    setNotice('');
    try {
      const result = await apiRequest<{ data: Person }>(`/v1/people/${person.id}`, data.token, data.me.activeRole, { method: 'PATCH', body: JSON.stringify(changes) });
      setPerson(result.data);
      setNotice('Cadastro atualizado.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível salvar.');
    }
  }

  return (
    <>
      <p className="eyebrow">Área do aluno</p>
      <h1>Cadastro</h1>
      <section className="card">
        {!person && !error && <p>Carregando cadastro…</p>}
        {error && <p className="error" role="alert">{error}</p>}
        {notice && <p className="success" role="status">{notice}</p>}
        {person && (
          <form className="form-grid" onSubmit={save}>
            <p><strong>{person.name}</strong></p>
            <p>Nível escolar: {studentLevel(person.studentLevel)}. Data de nascimento e CPF são alterados pela secretaria.</p>
            <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" disabled={readOnly} /></label>
            <label>Telefone<input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" disabled={readOnly} /></label>
            {readOnly ? <p>O acesso temporário só consulta. Nada é salvo.</p> : <button className="primary" type="submit">Salvar contato</button>}
          </form>
        )}
      </section>
    </>
  );
}
