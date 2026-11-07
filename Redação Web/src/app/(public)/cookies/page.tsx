import type { Metadata } from 'next';
import { LegalArticle } from '@/components/LegalArticle';

export const metadata: Metadata = { title: 'Cookies | Redação Nota Mil' };

export default function Page() {
  return <LegalArticle file="aviso-de-cookies.md" />;
}
