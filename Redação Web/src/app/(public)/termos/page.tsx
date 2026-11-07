import type { Metadata } from 'next';
import { LegalArticle } from '@/components/LegalArticle';

export const metadata: Metadata = { title: 'Termos | Redação Nota Mil' };

export default function Page() {
  return <LegalArticle file="termos-de-servico.md" />;
}
