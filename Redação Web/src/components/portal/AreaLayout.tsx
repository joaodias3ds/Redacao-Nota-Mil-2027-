'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { roleLabel } from '@/lib/supabase';
import { PortalProvider } from './portal-context';
import { usePortal } from './use-portal';

export function AreaLayout({
  allow,
  eyebrow,
  modules,
  children,
}: {
  allow: readonly string[];
  eyebrow: string;
  modules: readonly { href: string; label: string }[];
  children: ReactNode;
}) {
  const portal = usePortal(allow);
  const pathname = usePathname();
  const home = modules[0]?.href ?? '/';

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <Link href={home}>
          <img src="/brand/logo-redacao-1000.png" alt="Redação Nota Mil" className="logo" />
        </Link>
        <p className="eyebrow">{eyebrow}</p>
        {portal.data && <p className="sidebar-name">{portal.data.me.fullName}</p>}
        <nav className="module-nav" aria-label={eyebrow}>
          {modules.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={current ? 'module-link is-active' : 'module-link'} aria-current={current ? 'page' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <nav aria-label="Outros perfis" className="role-switch">
          {portal.data?.me.roles.filter((role) => role !== portal.data?.me.activeRole && roleLabel[role]).map((role) => (
            <button key={role} type="button" className="secondary" onClick={() => void portal.data?.switchRole(role)}>
              Entrar como {roleLabel[role]}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <button type="button" className="secondary" onClick={() => void portal.data?.signOut()}>Sair</button>
        </div>
      </aside>
      <main className="portal-content">
        {portal.loading && <p>Carregando sua área…</p>}
        {portal.error && <p className="error" role="alert">{portal.error}</p>}
        {portal.data && (
          <PortalProvider value={portal.data}>
            {portal.data.warnings.map((warning) => <p className="error" role="alert" key={warning}>{warning}</p>)}
            {children}
          </PortalProvider>
        )}
      </main>
    </div>
  );
}
