'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type { CompetencyId, TeacherEssayDetail } from '@nota-mil/shared/student';

const SCORES = [0, 40, 80, 120, 160, 200];
const IDS: CompetencyId[] = ['C1', 'C2', 'C3', 'C4', 'C5'];

export default function ProfessorReviewPage() {
  const params = useParams<{ essayId: string }>();
  const router = useRouter();
  const essayId = params.essayId;
  const [detail, setDetail] = useState<TeacherEssayDetail | null>(null);
  const [scores, setScores] = useState<Record<CompetencyId, number>>({
    C1: 120,
    C2: 120,
    C3: 120,
    C4: 120,
    C5: 120,
  });
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/professor/essays/${encodeURIComponent(essayId)}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'Falha');
        setDetail(j);
        const next = { ...scores };
        for (const c of j.preCorrection?.competencies || []) {
          next[c.id as CompetencyId] = c.score;
        }
        if (j.official?.competencies) {
          for (const c of j.official.competencies) {
            next[c.id as CompetencyId] = c.score;
          }
          setNote(j.official.teacherNote || '');
        }
        setScores(next);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Erro'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [essayId]);

  const total = useMemo(
    () => IDS.reduce((s, id) => s + (scores[id] || 0), 0),
    [scores],
  );

  async function submit(action: 'publish' | 'return') {
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      const res = await fetch(`/api/professor/essays/${encodeURIComponent(essayId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          teacherNote: note,
          competencies: IDS.map((id) => ({ id, score: scores[id] })),
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Falha');
      setMsg(action === 'publish' ? `Nota oficial publicada: ${j.official?.total}/1000` : 'Devolvida para reescrita');
      setTimeout(() => router.push('/professor/fila'), 900);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro');
    } finally {
      setBusy(false);
    }
  }

  if (error && !detail) {
    return (
      <>
        <Link className="prof-btn ghost" href="/professor/fila">
          Voltar
        </Link>
        <p className="prof-muted">{error}</p>
      </>
    );
  }

  if (!detail) {
    return <p className="prof-muted">Carregando redação…</p>;
  }

  return (
    <>
      <Link className="prof-btn ghost" href="/professor/fila">
        Voltar à fila
      </Link>
      <h1 className="prof-title" style={{ marginTop: 12 }}>
        Revisar redação
      </h1>
      <p className="prof-muted">
        {detail.studentName} · {detail.statusLabel}
        {detail.preCorrection ? ` · IA ${detail.preCorrection.estimatedTotal}/1000` : ''}
      </p>

      <section className="prof-card">
        <p style={{ margin: 0, fontWeight: 700 }}>Tema</p>
        <p className="prof-muted">{detail.theme}</p>
      </section>

      <section className="prof-card">
        <p style={{ margin: '0 0 8px', fontWeight: 700 }}>Texto do aluno</p>
        <p className="prof-text">{detail.text}</p>
      </section>

      {detail.preCorrection ? (
        <section className="prof-card">
          <p style={{ margin: '0 0 8px', fontWeight: 700 }}>Pré-correção da IA (estimativa)</p>
          <p className="prof-muted">{detail.preCorrection.disclaimer}</p>
          <ul>
            {detail.preCorrection.competencies.map((c) => (
              <li key={c.id}>
                {c.id} · {c.label}: <strong>{c.score}</strong>
                {c.comment ? ` — ${c.comment}` : ''}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="prof-card">
        <div className="prof-row" style={{ marginBottom: 12 }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Sua nota (oficial)</p>
          <span className="prof-badge">{total}/1000</span>
        </div>
        <div className="prof-score-grid">
          {IDS.map((id) => (
            <div key={id} className="prof-score-row">
              <label htmlFor={`score-${id}`}>
                {id} · {LABELS[id]}
              </label>
              <select
                id={`score-${id}`}
                value={scores[id]}
                onChange={(e) => setScores((s) => ({ ...s, [id]: Number(e.target.value) }))}
              >
                {SCORES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <span className="prof-muted">/200</span>
            </div>
          ))}
        </div>
        <p style={{ margin: '16px 0 8px', fontWeight: 600 }}>Comentário ao aluno</p>
        <textarea
          className="prof-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Orientação breve para o aluno"
        />
        {error ? <p className="prof-muted">{error}</p> : null}
        {msg ? <p className="prof-muted">{msg}</p> : null}
        <div className="prof-actions">
          <button type="button" className="prof-btn" disabled={busy} onClick={() => submit('publish')}>
            {busy ? 'Salvando…' : 'Publicar nota oficial'}
          </button>
          <button
            type="button"
            className="prof-btn secondary"
            disabled={busy}
            onClick={() => submit('return')}
          >
            Devolver para reescrita
          </button>
        </div>
      </section>
    </>
  );
}

const LABELS: Record<CompetencyId, string> = {
  C1: 'Norma culta',
  C2: 'Tema e repertório',
  C3: 'Argumentação',
  C4: 'Coesão',
  C5: 'Proposta de intervenção',
};
