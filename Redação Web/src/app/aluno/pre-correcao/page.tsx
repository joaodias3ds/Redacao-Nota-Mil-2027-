import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockPreCorrection } from '@/lib/student-mock';

export default function PreCorrecaoPage() {
  const data = mockPreCorrection;
  return (
    <PhoneShell showNav={false}>
      <Link className="aluno-btn ghost" href="/aluno/status" style={{ alignSelf: 'flex-start' }}>
        Voltar
      </Link>
      <h1 className="aluno-title">Pré-correção</h1>
      <section className="aluno-card">
        <p className="aluno-overline">Nota estimada · IA</p>
        <p className="aluno-muted">{data.disclaimer}</p>
        <h2 className="aluno-title" style={{ fontSize: 40, color: '#d1007b' }}>
          {data.estimatedTotal}
          <span style={{ fontSize: 20, color: '#6e6f72', fontWeight: 500 }}>/{data.maxTotal}</span>
        </h2>
      </section>
      {data.competencies.map((c) => (
        <section key={c.id} className={`aluno-card${c.attention ? ' attention' : ''}`}>
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
      <section className="aluno-card attention">
        <p className="aluno-overline">Ponto de atenção · {data.attention.competency}</p>
        <p className="aluno-body" style={{ fontWeight: 700 }}>
          {data.attention.title}
        </p>
        <p className="aluno-muted">{data.attention.body}</p>
        <Link className="aluno-btn ghost" href="/aluno/feed" style={{ alignSelf: 'flex-start' }}>
          Ver repertórios para este tema
        </Link>
      </section>
      <button type="button" className="aluno-btn secondary">
        Pedir revisão
      </button>
      <Link className="aluno-btn" href="/aluno/editor">
        Reescrever
      </Link>
    </PhoneShell>
  );
}
