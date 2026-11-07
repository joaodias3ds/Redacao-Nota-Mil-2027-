'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Início' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/aula-experimental', label: 'Contato' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function current(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <header className="site-header">
      <div className="site-header-bar">
        <Link href="/" aria-label="Redação Nota Mil, início">
          <img src="/brand/logo-redacao-1000.png" alt="" className="site-logo" />
        </Link>
        <nav className="site-nav" aria-label="Principal">
          {links.map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href) ? 'page' : undefined} className={current(item.href) ? 'is-current' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-cta">
          <Link className="secondary" href="/login">Área do aluno</Link>
          <Link className="primary" href="/aula-experimental">Agendar aula experimental</Link>
        </div>
        <button type="button" className="site-burger secondary" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          Menu
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" className="site-menu" aria-label="Menu">
          {links.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>Área do aluno</Link>
          <Link className="primary" href="/aula-experimental" onClick={() => setOpen(false)}>Agendar aula experimental</Link>
        </nav>
      )}
    </header>
  );
}
