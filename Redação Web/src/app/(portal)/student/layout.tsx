'use client';

import { AreaLayout } from '@/components/portal/AreaLayout';

const modules = [
  { href: '/student/dashboard', label: 'Resumo' },
  { href: '/student/matriculas', label: 'Matrículas' },
  { href: '/student/cadastro', label: 'Cadastro' },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <AreaLayout allow={['ALUNO', 'ACESSO_TEMPORARIO']} eyebrow="Área do aluno" modules={modules}>{children}</AreaLayout>;
}
