'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { TeacherQueueItem } from '@nota-mil/shared/student';

export default function ProfessorFilaPage() {
  const [items, setItems] = useState<TeacherQueueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/professor/fila')
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'Falha');
        setItems(j.items || []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Erro'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="prof-title">Fila de correção</h1>
      <p className="prof-muted">
        Redações com pré-correção da IA. Publique a nota oficial ou devolva para reescrita.
      </p>
      {loading ? <p className="prof-muted">Carregando…</p> : null}
      {error ? <p className="prof-muted">{error}</p> : null}
      {!loading && !items.length ? (
        <div className="prof-card">
          <p>Nenhuma redação na fila.</p>
          <p className="prof-muted">Envie uma pelo app do aluno (`/aluno/editor`) e volte aqui.</p>
          <Link className="prof-btn" href="/aluno/editor">
            Abrir editor do aluno
          </Link>
        </div>
      ) : null}
      {items.map((item) => (
        <article key={item.essayId} className="prof-card">
          <div className="prof-row">
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>{item.studentName}</p>
              <p className="prof-muted" style={{ margin: '4px 0 0' }}>
                {item.theme}
              </p>
              <p className="prof-muted" style={{ margin: '4px 0 0' }}>
                Enviada: {item.sentAtLabel}
                {item.estimatedTotal != null ? ` · IA ${item.estimatedTotal}/1000` : ''}
              </p>
            </div>
            <span className="prof-badge">{item.statusLabel}</span>
          </div>
          <div className="prof-actions">
            <Link className="prof-btn" href={`/professor/fila/${item.essayId}`}>
              Revisar
            </Link>
          </div>
        </article>
      ))}
    </>
  );
}
