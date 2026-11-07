'use client';

import { AreaLayout } from '@/components/portal/AreaLayout';

const modules = [
  { href: '/guardian/dashboard', label: 'Resumo' },
  { href: '/guardian/filhos', label: 'Filhos' },
];

export default function GuardianLayout({ children }: { children: React.ReactNode }) {
  return <AreaLayout allow={['RESPONSAVEL']} eyebrow="Área do responsável" modules={modules}>{children}</AreaLayout>;
}
