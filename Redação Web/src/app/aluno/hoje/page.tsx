'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { TodayHome } from '@nota-mil/shared/student';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { studentApi } from '@/lib/student-api';

export default function HojePage() {
  const [data, setData] = useState<TodayHome | null>(null);

  useEffect(() => {
    studentApi.getToday().then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <PhoneShell>
        <p className="aluno-muted">Carregando…</p>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <p className="aluno-muted">{data.greeting}</p>
      <h1 className="aluno-title">Oi, {data.studentName}</h1>

      {data.draft ? (
        <section className="aluno-card">
          <div className="aluno-row">
            <p className="aluno-overline">Rascunho</p>
            <p className="aluno-muted">{data.draft.savedLabel}</p>
          </div>
          <Link className="aluno-btn" href="/aluno/editor">
            Continuar redação
          </Link>
          <p className="aluno-body" style={{ color: '#57585a' }}>
            Tema: {data.draft.theme}
          </p>
          <p className="aluno-muted">
            {data.draft.linesUsed} de {data.draft.linesMax} linhas
          </p>
        </section>
      ) : null}

      {data.lastEssay ? (
        <Link href="/aluno/status" className="aluno-card" style={{ textDecoration: 'none' }}>
          <div className="aluno-row">
            <p className="aluno-body" style={{ fontWeight: 700 }}>
              Sua última redação
            </p>
            <span className="aluno-badge">{data.lastEssay.statusLabel}</span>
          </div>
          <div className="aluno-row" style={{ marginTop: 8 }}>
            {['Enviada', 'IA', 'Professor', 'Pronta'].map((label, i) => (
              <div key={label} style={{ textAlign: 'center', flex: 1 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    margin: '0 auto 4px',
                    background: data.lastEssay!.pipeline[i]?.done
                      ? '#ec008b'
                      : data.lastEssay!.pipeline[i]?.current
                        ? '#d1007b'
                        : '#dcdcdf',
                  }}
                />
                <p className="aluno-muted" style={{ fontSize: 11 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Link>
      ) : null}

      <section className="aluno-card">
        <p className="aluno-overline">Meta do feed</p>
        <p className="aluno-body" style={{ fontWeight: 700 }}>
          {data.feedGoal.done}/{data.feedGoal.target} repertórios
        </p>
        <div className="aluno-track">
          <div
            className="aluno-fill"
            style={{ width: `${(data.feedGoal.done / data.feedGoal.target) * 100}%` }}
          />
        </div>
        <p className="aluno-muted">
          Sequência: {data.weekStreakDays} dias · Tema da semana: {data.weekTheme}
        </p>
      </section>
    </PhoneShell>
  );
}
