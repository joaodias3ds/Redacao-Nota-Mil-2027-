'use client';

import { AreaLayout } from '@/components/portal/AreaLayout';

const modules = [
  { href: '/teacher/dashboard', label: 'Resumo' },
  { href: '/teacher/turmas', label: 'Minhas turmas' },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <AreaLayout allow={['PROFESSOR']} eyebrow="Área do professor" modules={modules}>{children}</AreaLayout>;
}
