import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockEvolution } from '@/lib/student-mock';

export default function EvolucaoPage() {
  const data = mockEvolution;
  const max = Math.max(...data.points.map((p) => p.total));

  return (
    <PhoneShell>
      <p className="aluno-overline">Últimas 6 redações</p>
      <h1 className="aluno-title">Minha evolução</h1>
      <section className="aluno-card">
        <h2 className="aluno-title" style={{ fontSize: 40, color: '#d1007b' }}>
          {data.latestTotal}
        </h2>
        <p className="aluno-muted">nota mais recente</p>
        <p className="aluno-body" style={{ color: '#1e7a4c', fontWeight: 600 }}>
          +{data.deltaSinceFirst} desde a 1ª
        </p>
      </section>
      <section className="aluno-card">
        <div className="aluno-chart">
          {data.points.map((p) => (
            <div key={p.id} className="col">
              <div className="bar" style={{ height: `${(p.total / max) * 100}%` }} />
              <p className="aluno-muted">{p.label}</p>
            </div>
          ))}
        </div>
      </section>
      <p className="aluno-overline">Por competência</p>
      {data.competencies.map((c) => (
        <section key={c.id} className="aluno-card">
          <div className="aluno-row">
            <p className="aluno-body" style={{ fontWeight: 700 }}>
              {c.id}
            </p>
            <p className="aluno-title" style={{ fontSize: 22 }}>
              {c.score}
            </p>
          </div>
          <p className="aluno-muted">{c.label}</p>
          {c.attention ? (
            <p style={{ color: '#e59a00', fontWeight: 700, margin: 0 }}>atenção</p>
          ) : c.delta ? (
            <p style={{ color: '#1e7a4c', fontWeight: 700, margin: 0 }}>+{c.delta}</p>
          ) : null}
        </section>
      ))}
      <section className="aluno-card">
        <p className="aluno-overline">Frequência</p>
        <p className="aluno-body">{data.attendance.label}</p>
      </section>
    </PhoneShell>
  );
}
