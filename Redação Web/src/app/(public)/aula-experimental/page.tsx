'use client';

import { useState } from 'react';
import { COMPANY } from '@/lib/company';
import { PUBLIC_COURSES } from '@/lib/public-courses';
import { trialRequestErrors } from '@/lib/validation';

export default function TrialLessonPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = trialRequestErrors({ name, phone, email, course, consent });
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setReady(false);
      return;
    }
    const body = [`Nome: ${name.trim()}`, `Telefone: ${phone.trim()}`, `E-mail: ${email.trim()}`, `Curso: ${course}`, `Mensagem: ${message.trim() || 'Sem mensagem'}`].join('\n');
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Aula experimental')}&body=${encodeURIComponent(body)}`;
    setReady(true);
  }

  return (
    <main className="site-wrap" style={{ maxWidth: 720, display: 'grid', gap: 16 }}>
      <h1>Agendar aula experimental</h1>
      <p>O formulário abre o seu e-mail para {COMPANY.email}. A equipe responde pelo telefone {COMPANY.phone} ou pelo endereço informado. A aula experimental não reserva vaga.</p>
      <form className="form-grid" onSubmit={submit} noValidate>
        <label>Nome completo
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
        </label>
        <label>Telefone / WhatsApp
          <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="(62) 90000-0000" aria-invalid={Boolean(errors.phone)} />
          {errors.phone && <span className="field-error" role="alert">{errors.phone}</span>}
        </label>
        <label>E-mail
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="nome@email.com" aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
        </label>
        <label>Curso de interesse
          <select value={course} onChange={(event) => setCourse(event.target.value)} aria-invalid={Boolean(errors.course)}>
            <option value="">Selecione</option>
            {PUBLIC_COURSES.map((item) => <option key={item.id}>{item.title}</option>)}
          </select>
          {errors.course && <span className="field-error" role="alert">{errors.course}</span>}
        </label>
        <label>Mensagem
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={400} rows={4} placeholder="Conte o objetivo: ENEM, vestibular, concurso ou reforço." />
        </label>
        <label>
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          Autorizo o contato da equipe Redação Nota Mil
          {errors.consent && <span className="field-error" role="alert">{errors.consent}</span>}
        </label>
        <button className="primary" type="submit">Enviar pedido por e-mail</button>
      </form>
      {ready && <p role="status">Se o programa de e-mail não abriu, escreva direto para {COMPANY.email} com os mesmos dados.</p>}
    </main>
  );
}
