import Link from 'next/link';
import { ArrowRight, Atom, Check, ClipboardCheck, Languages, Leaf, PenLine, Quote, Sigma, Smartphone, SpellCheck, UserRoundCheck, Users } from 'lucide-react';

const subjects = [
  [PenLine, 'Redação'],
  [Sigma, 'Matemática'],
  [Atom, 'Exatas'],
  [SpellCheck, 'Gramática'],
  [Leaf, 'Biologia'],
  [Languages, 'Inglês'],
  [UserRoundCheck, 'Reforço individual'],
] as const;

export default function HomePage() {
  return (
    <>
      <section className="site-hero">
        <div className="site-hero-grid">
          <div>
            <p className="site-kicker">Curso preparatório · Goiânia</p>
            <h1>Escrever bem se aprende com método.</h1>
            <p>Redação e disciplinas complementares para ENEM, vestibulares e concursos. A aula é presencial. A nota de cada texto depende da produção do aluno e da correção do professor.</p>
            <div className="site-actions">
              <Link className="primary" href="/aula-experimental">Agendar aula experimental</Link>
              <Link className="site-ghost" href="/cursos">Conhecer os cursos <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="site-hero-visual">
            <div className="photo-slot">Foto da sala de aula entra aqui. Ainda não há imagem autorizada da escola.</div>
            <article className="float-card float-a">
              <small>EXEMPLO DE TELA</small>
              <p><strong>Próxima aula</strong></p>
              <p>O horário real da turma aparece no portal depois do cadastro.</p>
            </article>
            <article className="float-card float-b">
              <small>DEVOLUTIVA · EXEMPLO</small>
              {['C1', 'C2', 'C3', 'C4', 'C5'].map((item) => (
                <div className="comp-row" key={item}><b>{item}</b><span /><b>—</b></div>
              ))}
              <p>Sem nota publicada nesta página.</p>
            </article>
            <article className="float-card float-c">
              <p><strong>Aviso ao responsável</strong></p>
              <p>Entra no aplicativo quando a secretaria publicar.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="subject-strip" aria-label="Disciplinas">
        <ul>
          {subjects.map(([Icon, label]) => (
            <li key={label}><Icon size={20} color="#EC008B" aria-hidden="true" />{label}</li>
          ))}
        </ul>
      </section>

      <section className="site-wrap feature-list">
        <article className="feature">
          <div className="feature-media">
            <div className="photo-slot">Foto: correção de redação em sala</div>
            <article className="float-card">
              <small>EXEMPLO DE COMENTÁRIO</small>
              <p>O comentário do professor aparece na devolutiva daquele texto. Não é uma previsão da nota do ENEM.</p>
            </article>
          </div>
          <div className="feature-copy">
            <p className="site-kicker light">Produção</p>
            <h2>Cada redação volta com um caminho.</h2>
            <p>Quando a correção for publicada, o comentário pode ser organizado nas competências usadas pelo ENEM. Isso descreve aquele texto.</p>
            <ul>
              {['Comentário ligado ao texto entregue', 'Arquivo enviado quando o módulo estiver ativo', 'Prazo combinado com a turma'].map((item) => (
                <li key={item}><Check size={18} color="#EC008B" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        </article>
        <article className="feature flip">
          <div className="feature-media">
            <div className="photo-slot">Foto: responsável e aluno consultando o aplicativo</div>
          </div>
          <div className="feature-copy">
            <p className="site-kicker light">Para responsáveis</p>
            <h2>Acompanhar o que foi liberado.</h2>
            <p>Quem tem vínculo vê os filhos autorizados, inclusive os dois irmãos quando os dois estão ligados à mesma conta. Frequência e mensalidade só aparecem depois do lançamento.</p>
            <ul>
              {['Cada filho tem o próprio vínculo', 'Pedagógico e financeiro são permissões separadas', 'Nada é mostrado antes da secretaria publicar'].map((item) => (
                <li key={item}><Check size={18} color="#EC008B" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        </article>
        <article className="feature">
          <div className="feature-media">
            <div className="photo-slot">Foto: alunos em aula presencial</div>
          </div>
          <div className="feature-copy">
            <p className="site-kicker light">Evolução</p>
            <h2>O histórico fica com o aluno.</h2>
            <p>As redações corrigidas ficam na área do aluno. O gráfico de notas entra quando houver lançamento real. Esta página não mostra resultado de ninguém.</p>
            <ul>
              {['Consulta só dos próprios textos', 'Professor vê apenas a própria turma', 'Meta e nota não são prometidas pelo curso'].map((item) => (
                <li key={item}><Check size={18} color="#EC008B" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="site-band">
        <div className="site-band-inner" style={{ display: 'grid', gap: 32 }}>
          <h2 className="site-center">Conheça os nossos <span className="site-accent">cursos</span></h2>
          <div className="course-grid">
            {[
              [PenLine, 'Redação', 'Produção e devolutiva por competência, na turma presencial.'],
              [Users, 'Vestibulares e concursos', 'Gêneros e bancas tratados em aula, sem promessa de vaga.'],
              [UserRoundCheck, 'Reforço individual', 'Aula particular combinada com a secretaria.'],
            ].map(([Icon, title, text]) => (
              <article className="course-card" key={String(title)}>
                <span className="icon-plate"><Icon size={24} aria-hidden="true" /></span>
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
                <Link href="/cursos">Ver detalhes <ArrowRight size={16} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <div className="chip-row">
            <span>Também oferecemos:</span>
            {['Matemática', 'Exatas', 'Gramática', 'Biologia', 'Inglês'].map((item) => <span className="chip" key={item}>{item}</span>)}
          </div>
          <figure className="quote-slot">
            <Quote size={28} color="#EC008B" aria-hidden="true" />
            <blockquote>
              <p>Espaço reservado para um depoimento com autorização de uso. Ainda não publicamos fala de aluno ou responsável.</p>
            </blockquote>
          </figure>
        </div>
      </section>

      <section className="site-wrap" style={{ display: 'grid', gap: 32 }}>
        <h2 className="site-center">Preparação pensada para cada etapa</h2>
        <div className="audience-grid">
          {[
            ['Para o ENEM', 'Estudantes do ensino médio em turma presencial.'],
            ['Para vestibulares e concursos', 'Quem já concluiu e quer praticar um gênero específico.'],
            ['Para o reforço escolar', 'Aula individual combinada à parte da turma.'],
          ].map(([title, text]) => (
            <Link className="audience-card" href="/cursos" key={title}>
              <div className="photo-slot">{text}</div>
              <strong>{title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-wrap" style={{ display: 'grid', gap: 32, paddingTop: 0 }}>
        <h2 className="site-center">O jeito Nota Mil: perto de você</h2>
        <div className="diff-grid">
          {[
            [Users, 'Turmas presenciais', 'A vaga é confirmada pela secretaria, não pelo envio do formulário.'],
            [ClipboardCheck, 'Critério explícito', 'A devolutiva de redação pode seguir as competências do ENEM daquele texto.'],
            [Smartphone, 'Portal e aplicativo', 'Aluno, responsável e professor entram na própria área.'],
          ].map(([Icon, title, text]) => (
            <article className="diff-card" key={String(title)}>
              <Icon size={24} color="#EC008B" aria-hidden="true" />
              <h3>{String(title)}</h3>
              <p>{String(text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-cta-band">
        <div className="site-band-inner">
          <h2>Pronto para dar o <span className="site-accent">próximo passo</span>?</h2>
          <p>Agende uma aula experimental e conheça a turma, os professores e o método. A aula experimental não reserva vaga.</p>
          <Link className="primary" href="/aula-experimental">Agendar aula experimental</Link>
        </div>
      </section>
    </>
  );
}
