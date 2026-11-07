import Link from 'next/link';
import { COMPANY } from '@/lib/company';

const whatsapp = 'https://wa.me/5562981899570';

export function SiteFooter() {
  return (
    <footer className="site-footer-dark">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <span className="site-logo-plate">
            <img src="/brand/logo-redacao-1000.png" alt="Redação Nota Mil" />
          </span>
          <p>{COMPANY.legalName} · CNPJ {COMPANY.cnpj}</p>
          <p>{COMPANY.address}</p>
          <p><a href={`tel:+5562981899570`}>{COMPANY.phone}</a> · <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          <p>Novidades saem pelo Instagram. Não há lista de e-mail automática neste site.</p>
        </div>
        <div>
          <strong>Cursos</strong>
          <Link href="/cursos">Redação</Link>
          <Link href="/cursos">Vestibulares e concursos</Link>
          <Link href="/cursos">Reforço individual</Link>
        </div>
        <div>
          <strong>Disciplinas</strong>
          <Link href="/cursos">Matemática</Link>
          <Link href="/cursos">Exatas</Link>
          <Link href="/cursos">Gramática</Link>
          <Link href="/cursos">Biologia</Link>
          <Link href="/cursos">Inglês</Link>
        </div>
        <div>
          <strong>Acesso</strong>
          <Link href="/login">Área do aluno</Link>
          <Link href="/login">Responsáveis</Link>
          <Link href="/login">Professores</Link>
          <Link href="/enrollment">Matrícula on-line</Link>
          <Link href="/aula-experimental">Contato</Link>
        </div>
        <div>
          <strong>Documentos</strong>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/reembolso">Reembolso</Link>
          <Link href="/lgpd">Pedidos LGPD</Link>
        </div>
      </div>
      <div className="site-footer-base">
        <span>© {new Date().getFullYear()} {COMPANY.tradeName}. O curso não garante nota, aprovação ou vaga.</span>
        <div className="site-social">
          <a href={COMPANY.instagram} rel="noreferrer">Instagram {COMPANY.instagramHandle}</a>
          <a href={whatsapp} rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
