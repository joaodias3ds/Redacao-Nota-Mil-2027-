import type { Metadata } from 'next';
import { LegalArticle } from '@/components/LegalArticle';

export const metadata: Metadata = { title: 'Privacidade | Redação Nota Mil' };

export default function Page() {
  return <LegalArticle file="politica-de-privacidade.md" />;
}
