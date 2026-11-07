'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockFeedCards, mockToday } from '@/lib/student-mock';

export default function FeedPage() {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState('para-voce');
  const card = mockFeedCards[index % mockFeedCards.length];
  const goal = mockToday.feedGoal;

  return (
    <PhoneShell>
      <div className="aluno-row">
        {(
          [
            ['para-voce', 'Para você'],
            ['temas', 'Temas'],
            ['salvos', 'Salvos'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className="aluno-btn ghost"
            style={{ fontWeight: tab === id ? 700 : 500, color: tab === id ? '#211f20' : '#57585a' }}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
        <strong style={{ color: '#ec008b', marginLeft: 'auto' }}>
          {goal.done}/{goal.target}
        </strong>
      </div>

      <button type="button" className="aluno-feed" onClick={() => setIndex((i) => i + 1)}>
        <span className="kind">
          {card.kind.toUpperCase()} · COMPETÊNCIA {card.competency.replace('C', '')}
        </span>
        <h1 className="aluno-title" style={{ color: '#fff', fontSize: 32 }}>
          {card.title}
        </h1>
        <p className="aluno-muted" style={{ color: 'rgba(255,255,255,.65)' }}>
          {card.subtitle}
        </p>
        <p className="aluno-body" style={{ color: 'rgba(255,255,255,.9)' }}>
          {card.body}
        </p>
        <div>
          <p className="kind">COMO USAR</p>
          <p className="aluno-muted" style={{ color: 'rgba(255,255,255,.75)' }}>
            {card.howToUse}
          </p>
        </div>
      </button>

      <div className="aluno-row" style={{ justifyContent: 'flex-end' }}>
        <button type="button" className="aluno-btn secondary">
          Salvar
        </button>
        <Link className="aluno-btn" href="/aluno/editor">
          Usar
        </Link>
        <button type="button" className="aluno-btn secondary">
          Fonte
        </button>
      </div>
    </PhoneShell>
  );
}
