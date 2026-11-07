'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { OfficialGrade } from '@nota-mil/shared/student';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { studentApi } from '@/lib/student-api';

function OficialInner() {
  const params = useSearchParams();
  const essayId = params.get('essayId') || '22222222-2222-4222-8222-222222222222';
  const [data, setData] = useState<OfficialGrade | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentApi
      .getOfficialGrade(essayId)
      .then((g) => {
        if (!g) setError('Nota oficial ainda não publicada.');
        else setData(g);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Falha'));
  }, [essayId]);

  if (error) {
    return (
      <PhoneShell showNav={false}>
        <Link className="aluno-btn ghost" href="/aluno/status" style={{ alignSelf: 'flex-start' }}>
          Voltar
        </Link>
        <p className="aluno-muted">{error}</p>
      </PhoneShell>
    );
  }

  if (!data) {
    return (
      <PhoneShell showNav={false}>
        <p className="aluno-muted">Carregando nota oficial…</p>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell showNav={false}>
      <Link
        className="aluno-btn ghost"
        href={`/aluno/status?essayId=${encodeURIComponent(data.essayId)}`}
        style={{ alignSelf: 'flex-start' }}
      >
        Voltar
      </Link>
      <h1 className="aluno-title">Nota oficial</h1>
      <section className="aluno-card">
        <p className="aluno-overline">Publicada pelo professor</p>
        <p className="aluno-muted">{data.publishedAtLabel}</p>
        <h2 className="aluno-title" style={{ fontSize: 40, color: '#d1007b' }}>
          {data.total}
          <span style={{ fontSize: 20, color: '#6e6f72', fontWeight: 500 }}>/{data.maxTotal}</span>
        </h2>
      </section>
      {data.competencies.map((c) => (
        <section key={c.id} className="aluno-card">
          <div className="aluno-row">
            <p className="aluno-body" style={{ fontWeight: 600 }}>
              {c.id} · {c.label}
            </p>
            <p className="aluno-title" style={{ fontSize: 20 }}>
              {c.score}
            </p>
          </div>
          <div className="aluno-track">
            <div className="aluno-fill" style={{ width: `${(c.score / c.max) * 100}%` }} />
          </div>
        </section>
      ))}
      {data.teacherNote ? (
        <section className="aluno-card">
          <p className="aluno-overline">Comentário do professor</p>
          <p className="aluno-body">{data.teacherNote}</p>
        </section>
      ) : null}
    </PhoneShell>
  );
}

export default function OficialPage() {
  return (
    <Suspense
      fallback={
        <PhoneShell showNav={false}>
          <p className="aluno-muted">Carregando…</p>
        </PhoneShell>
      }
    >
      <OficialInner />
    </Suspense>
  );
}
