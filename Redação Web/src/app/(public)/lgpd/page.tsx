'use client';

import { FormEvent, useState } from 'react';
import { COMPANY } from '@/lib/company';

const TYPES = [
  'Acesso aos dados',
  'Correção de dado',
  'Eliminação do que não precisa ser guardado',
  'Revogação de consentimento de imagem ou divulgação',
  'Oposição a um uso',
  'Informação sobre com quem os dados foram compartilhados',
  'Portabilidade',
] as const;

export default function LgpdPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Pedido LGPD — ${data.get('tipo')}`;
    const body = [
      `Tipo: ${data.get('tipo')}`,
      `Nome de quem pede: ${data.get('nome')}`,
      `E-mail: ${data.get('email')}`,
      `Telefone: ${data.get('telefone')}`,
      `Aluno: ${data.get('aluno')}`,
      `Vínculo: ${data.get('vinculo')}`,
      '',
      String(data.get('pedido') || ''),
    ].join('\n');
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
      <main className="legal">
        <h1>Pedido do titular</h1>
        <p>
          Use este formulário para acesso, correção, eliminação, portabilidade, informação de compartilhamento, oposição ou revogação de consentimento. O envio abre o seu e-mail para {COMPANY.email}. Não escreva senha nem dados de cartão.
        </p>
        <p>Se o aluno for criança ou adolescente, o pedido deve ser feito pelo responsável já vinculado, salvo quando o próprio adolescente puder exercer o direito.</p>
        <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
          <label>Tipo de pedido
            <select name="tipo" required defaultValue={TYPES[0]}>
              {TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label>Seu nome<input name="nome" required minLength={2} autoComplete="name" /></label>
          <label>Seu e-mail<input name="email" type="email" required autoComplete="email" /></label>
          <label>Telefone<input name="telefone" required autoComplete="tel" /></label>
          <label>Nome do aluno<input name="aluno" required /></label>
          <label>Seu vínculo
            <select name="vinculo" required defaultValue="Responsável">
              <option>Responsável</option>
              <option>Aluno maior de idade</option>
              <option>O próprio aluno adolescente</option>
            </select>
          </label>
          <label>Descreva o pedido<textarea name="pedido" required minLength={10} rows={5} style={{ width: '100%', font: 'inherit', padding: 12 }} /></label>
          <button className="primary" type="submit">Abrir e-mail com o pedido</button>
        </form>
        {sent && <p role="status">Se o programa de e-mail não abriu, escreva direto para {COMPANY.email} com os mesmos dados.</p>}
      </main>
  );
}
