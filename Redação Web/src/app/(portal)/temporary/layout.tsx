'use client';

import { AreaLayout } from '@/components/portal/AreaLayout';

const modules = [{ href: '/temporary/dashboard', label: 'Visão do aluno' }];

export default function TemporaryLayout({ children }: { children: React.ReactNode }) {
  return <AreaLayout allow={['ACESSO_TEMPORARIO']} eyebrow="Acesso temporário" modules={modules}>{children}</AreaLayout>;
}
