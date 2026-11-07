'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockToday } from '@/lib/student-mock';

export default function EditorPage() {
  const draft = mockToday.draft;
  const [text, setText] = useState(draft.text);
  const lines = useMemo(
    () => Math.max(1, text.split(/\n/).length + Math.floor(text.length / 70)),
    [text],
  );

  return (
    <PhoneShell showNav={false}>
      <div className="aluno-row">
        <Link className="aluno-btn ghost" href="/aluno/hoje">
          Voltar
        </Link>
        <p className="aluno-muted">Salvo agora</p>
        <Link className="aluno-btn" href="/aluno/status">
          Enviar
        </Link>
      </div>
      <h1 className="aluno-title">Nova redação</h1>
      <p className="aluno-overline">Tema</p>
      <p className="aluno-body" style={{ fontWeight: 600 }}>
        {draft.theme}
      </p>
      <p className="aluno-overline">Seu texto</p>
      <textarea className="aluno-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <p className="aluno-muted">
        {Math.min(lines, draft.linesMax)} de {draft.linesMax} linhas · Mínimo recomendado:{' '}
        {draft.minRecommended} linhas
      </p>
      <Link href="/aluno/feed" className="aluno-card" style={{ background: '#fff0f8', textDecoration: 'none' }}>
        <p className="aluno-body" style={{ fontWeight: 700 }}>
          Repertório que você salvou
        </p>
        <p className="aluno-muted" style={{ color: '#d1007b', fontWeight: 600 }}>
          Modernidade líquida + Ver salvos
        </p>
      </Link>
    </PhoneShell>
  );
}
