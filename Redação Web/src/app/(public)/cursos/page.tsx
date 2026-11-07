'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CircleCheck } from 'lucide-react';

const tabs = [
  { id: 'enem', label: 'ENEM', text: 'A prática segue a proposta dissertativo-argumentativa e pode organizar a devolutiva nas cinco competências. Isso descreve o texto corrigido. Não é a nota oficial da prova.' },
  { id: 'vest', label: 'Vestibulares', text: 'O gênero e a banca mudam conforme o vestibular. O plano da turma é definido em aula, não nesta página.' },
  { id: 'conc', label: 'Concursos', text: 'Quando a turma trabalha concurso, o texto segue o gênero pedido pelo edital daquele curso. O edital não é reproduzido aqui.' },
] as const;

export default function CoursesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('enem');
  const current = tabs.find((item) => item.id === tab) ?? tabs[0];
  return (
    <main className="site-wrap" style={{ display: 'grid', gap: 28 }}>
      <p className="crumbs"><Link href="/">Início</Link><span>/</span><span>Cursos</span><span>/</span><span>Redação</span></p>
      <div className="course-layout">
        <div>
          <h1>Redação</h1>
          <p className="site-lead" style={{ color: 'var(--text-secondary)' }}>Do planejamento do texto à proposta de intervenção, em aula presencial. A vaga e o horário são confirmados pela secretaria.</p>
          <div className="tabs" role="tablist" aria-label="Foco da redação">
            {tabs.map((item) => (
              <button key={item.id} type="button" className="secondary" role="tab" aria-selected={tab === item.id} onClick={() => setTab(item.id)}>{item.label}</button>
            ))}
          </div>
          <p>{current.text}</p>
          <ul className="check-list">
            {['Aula presencial com limite de vagas', 'Proposta combinada com a turma', 'Devolutiva do texto entregue', 'Dúvida tratada em aula ou no horário informado pela secretaria'].map((item) => (
              <li key={item}><CircleCheck size={20} color="#1E7A4C" aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </div>
        <aside className="panel">
          <h2>Turmas</h2>
          <p>Os horários e as vagas não ficam fixos nesta página. A secretaria informa a turma aberta no contato ou na matrícula.</p>
          <Link className="primary" href="/aula-experimental">Quero uma aula experimental</Link>
          <p><Link href="/enrollment">Já quero pedir matrícula</Link></p>
        </aside>
      </div>
      <section>
        <h2>Outras disciplinas</h2>
        <p>Matemática, exatas, gramática, biologia, inglês e reforço individual seguem o mesmo caminho: a secretaria confirma turma, horário e vaga. Nenhum preço é publicado aqui.</p>
      </section>
    </main>
  );
}
