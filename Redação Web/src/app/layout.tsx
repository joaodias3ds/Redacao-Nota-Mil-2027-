import type { Metadata } from 'next';
import './fonts.css';
import './colors.css';
import './styles.css';
import '../styles/styles.css';
import { CookieNotice } from '@/components/CookieNotice';

export const metadata: Metadata = {
  title: 'Redação Nota Mil',
  description: 'Curso preparatório presencial em Goiânia. Portal do aluno, matrícula e acompanhamento do responsável.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
        <div id="conteudo">{children}</div>
        <CookieNotice />
      </body>
    </html>
  );
}
