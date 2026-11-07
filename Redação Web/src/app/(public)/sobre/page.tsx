import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = { title: 'Sobre | Redação Nota Mil' };

export default function AboutPage() {
  return (
    <main className="site-wrap" style={{ display: 'grid', gap: 20, maxWidth: 800 }}>
      <p className="site-kicker light">A escola</p>
      <h1>Sobre o Redação Nota Mil</h1>
      <p>{COMPANY.tradeName} é o nome do curso da {COMPANY.legalName}, CNPJ {COMPANY.cnpj}. A unidade fica em {COMPANY.address}.</p>
      <p>As aulas são presenciais. O curso trabalha redação e pode incluir matemática, exatas, gramática, biologia, inglês e reforço individual. A oferta de cada turma é confirmada pela secretaria.</p>
      <p>O nome do curso não é uma promessa de nota. A correção descreve o texto do aluno. O curso não garante aprovação, vaga ou resultado de prova.</p>
      <p>Telefone {COMPANY.phone}. Urgência {COMPANY.phoneUrgent}. E-mail <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Instagram <a href={COMPANY.instagram}>{COMPANY.instagramHandle}</a>.</p>
      <p><Link href="/aula-experimental">Agendar aula experimental</Link> · <Link href="/privacidade">Política de privacidade</Link></p>
    </main>
  );
}
