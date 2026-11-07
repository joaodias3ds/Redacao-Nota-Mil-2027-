import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockToday } from '@/lib/student-mock';

export default function HojePage() {
  const data = mockToday;
  return (
    <PhoneShell>
      <p className="aluno-muted">{data.greeting}</p>
      <h1 className="aluno-title">Oi, {data.studentName}</h1>

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
                  margin: '0 auto 6px',
                  background: i < 2 ? '#1e7a4c' : i === 2 ? '#ec008b' : '#dcdcdf',
                }}
              />
              <p className="aluno-muted" style={{ fontWeight: i === 2 ? 700 : 500, color: i === 2 ? '#d1007b' : undefined }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </Link>

      <section className="aluno-card">
        <p className="aluno-overline">Meta do feed</p>
        <h2 className="aluno-title" style={{ fontSize: 28 }}>
          {data.feedGoal.done} / {data.feedGoal.target}
        </h2>
        <p className="aluno-muted">Faltam {data.feedGoal.target - data.feedGoal.done} cards</p>
        <Link className="aluno-btn" href="/aluno/feed">
          Abrir feed
        </Link>
      </section>

      <section className="aluno-card">
        <p className="aluno-overline">Esta semana</p>
        <p className="aluno-body">{data.weekStreakDays} dias de prática</p>
        <p className="aluno-overline">Tema da semana</p>
        <p className="aluno-body">{data.weekTheme}</p>
      </section>
    </PhoneShell>
  );
}
