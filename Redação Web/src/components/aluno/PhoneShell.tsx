'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/aluno/hoje', label: 'Hoje' },
  { href: '/aluno/feed', label: 'Feed' },
  { href: '/aluno/evolucao', label: 'Evolução' },
  { href: '/aluno/perfil', label: 'Perfil' },
];

export function PhoneShell({
  children,
  showNav = true,
}: {
  children: React.ReactNode;
  showNav?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="aluno-shell">
      <div className="aluno-phone">
        <main className="aluno-main">{children}</main>
        {showNav ? (
          <nav className="aluno-nav" aria-label="Principal">
            {tabs.map((tab) => (
              <Link key={tab.href} href={tab.href} data-active={pathname === tab.href}>
                <span className="dot" />
                {tab.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
