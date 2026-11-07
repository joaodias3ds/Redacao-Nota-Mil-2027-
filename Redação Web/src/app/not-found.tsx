import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="missing-page">
      <div className="missing-card">
        <img src="/brand/logo-redacao-1000.png" alt="Redação Nota Mil" className="missing-logo" />
        <svg className="missing-mark" viewBox="0 0 72 72" aria-hidden="true">
          <rect x="8" y="10" width="44" height="52" rx="6" fill="#FFF0F8" stroke="#D1007B" strokeWidth="2" />
          <path d="M40 10v14h14" fill="#FFDDEF" stroke="#D1007B" strokeWidth="2" />
          <text x="30" y="46" textAnchor="middle" fill="#D1007B" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="700">?</text>
        </svg>
        <p className="missing-code">404</p>
        <h1>Esta página não existe</h1>
        <p>O endereço não corresponde a nenhuma área do curso. Confira o link ou escolha um destino abaixo.</p>
        <div className="missing-actions">
          <Link className="primary" href="/">Ir para o início</Link>
          <Link className="secondary" href="/login">Entrar no portal</Link>
          <Link className="secondary" href="/enrollment">Pedir matrícula</Link>
        </div>
      </div>
    </main>
  );
}
