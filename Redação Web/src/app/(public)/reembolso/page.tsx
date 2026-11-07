import type { Metadata } from 'next';
import { LegalArticle } from '@/components/LegalArticle';

export const metadata: Metadata = { title: 'Reembolso | Redação Nota Mil' };

export default function Page() {
  return <LegalArticle file="politica-de-reembolso.md" />;
}
