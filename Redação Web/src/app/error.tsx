'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="missing-page">
      <div className="missing-card">
        <img src="/brand/logo-redacao-1000.png" alt="Redação Nota Mil" className="missing-logo" />
        <p className="eyebrow">Não foi possível abrir</p>
        <h1>Esta tela encontrou um erro</h1>
        <p>Os dados não foram carregados. Tente de novo ou volte ao início. Se o problema continuar, fale com a secretaria.</p>
        <div className="missing-actions">
          <button type="button" className="primary" onClick={() => reset()}>Tentar novamente</button>
          <Link className="secondary" href="/">Ir para o início</Link>
        </div>
      </div>
    </main>
  );
}
