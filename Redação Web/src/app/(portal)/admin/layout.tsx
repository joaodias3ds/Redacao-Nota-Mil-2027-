'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

const navItems = [
  { label: 'Painel', href: '/admin/dashboard' },
  { label: 'Pessoas', href: '/admin/pessoas' },
  { label: 'Vínculos', href: '/admin/vinculos' },
  { label: 'Turmas', href: '/admin/turmas' },
  { label: 'Matrículas', href: '/admin/matriculas' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function leave() {
    await getSupabase()?.auth.signOut();
    window.location.assign('/login');
  }

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <Link href="/admin/dashboard">
          <img src="/brand/logo-redacao-1000.png" alt="Redação Nota Mil" className="logo" />
        </Link>
        <p className="eyebrow">Secretaria</p>
        <nav className="module-nav" aria-label="Secretaria">
          {navItems.map((item) => {
            const current = item.href === '/admin/pessoas'
              ? pathname.startsWith('/admin/pessoas') || pathname.startsWith('/admin/students')
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={current ? 'module-link is-active' : 'module-link'} aria-current={current ? 'page' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <button type="button" className="secondary" onClick={() => void leave()}>Sair</button>
        </div>
      </aside>
      <main className="portal-content">{children}</main>
    </div>
  );
}
