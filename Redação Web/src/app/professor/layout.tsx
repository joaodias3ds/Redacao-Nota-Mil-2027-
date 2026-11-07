import Link from 'next/link';
import './professor.css';

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prof-shell">
      <aside className="prof-sidebar">
        <p className="prof-eyebrow">Área do professor</p>
        <h1 className="prof-brand">Redação Nota Mil</h1>
        <nav className="prof-nav">
          <Link href="/professor/fila">Fila de correção</Link>
          <Link href="/aluno/hoje">Ver app do aluno</Link>
        </nav>
        <p className="prof-note">Demo Parte 3 — sem login (depois liga no Supabase).</p>
      </aside>
      <main className="prof-main">{children}</main>
    </div>
  );
}
