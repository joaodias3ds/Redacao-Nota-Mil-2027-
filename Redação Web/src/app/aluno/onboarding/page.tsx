import Link from 'next/link';
import { PhoneShell } from '@/components/aluno/PhoneShell';

export default function OnboardingPage() {
  return (
    <PhoneShell showNav={false}>
      <p className="aluno-overline">Citação · C2</p>
      <p className="aluno-muted" style={{ fontWeight: 700, color: '#d1007b' }}>
        App Redação
      </p>
      <h1 className="aluno-title" style={{ fontSize: 34, lineHeight: 1.15 }}>
        Escreva. Receba
        <br />
        retorno. Evolua.
      </h1>
      <p className="aluno-body" style={{ color: '#57585a' }}>
        Envie sua redação, acompanhe a correção e veja sua evolução em cada competência.
      </p>
      <div style={{ marginTop: 'auto', display: 'grid', gap: 16 }}>
        <Link className="aluno-btn" href="/aluno/login">
          Próximo
        </Link>
        <Link className="aluno-btn ghost" href="/aluno/login" style={{ justifyContent: 'center' }}>
          Pular
        </Link>
      </div>
    </PhoneShell>
  );
}
