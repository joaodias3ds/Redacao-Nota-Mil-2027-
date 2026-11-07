import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';
import { mockToday } from '@/lib/student-mock';

export default function StatusPage() {
  const essay = mockToday.lastEssay;
  return (
    <PhoneShell showNav={false}>
      <Link className="aluno-btn ghost" href="/aluno/hoje" style={{ alignSelf: 'flex-start' }}>
        Voltar
      </Link>
      <h1 className="aluno-title">Status da correção</h1>
      <section className="aluno-card">
        <p className="aluno-overline">Redação enviada</p>
        <p className="aluno-body" style={{ fontWeight: 700 }}>
          {essay.theme}
        </p>
        <p className="aluno-muted">
          {essay.sentAtLabel} · Versão {essay.version}
        </p>
      </section>
      <section className="aluno-card" style={{ gap: 16 }}>
        {essay.pipeline.map((step) => (
          <div key={step.key} className="aluno-row" style={{ alignItems: 'flex-start' }}>
            <span
              style={{
                width: 14,
                height: 14,
                marginTop: 4,
                borderRadius: 999,
                background: step.done ? '#1e7a4c' : step.current ? '#ec008b' : '#dcdcdf',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <p className="aluno-body" style={{ fontWeight: 700 }}>
                {step.label}
              </p>
              <p className="aluno-muted">{step.detail}</p>
            </div>
          </div>
        ))}
      </section>
      <p className="aluno-muted">
        A pré-correção é uma estimativa feita por IA. A nota oficial é a do seu professor.
      </p>
      <Link className="aluno-btn" href="/aluno/pre-correcao">
        Ver pré-correção
      </Link>
    </PhoneShell>
  );
}
