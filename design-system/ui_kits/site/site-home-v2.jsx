function Float({ children, style, className }) {
  return <div className={'float ' + (className || '')} style={{ position: 'absolute', background: 'var(--surface-card)', borderRadius: 12, boxShadow: '0 16px 40px rgba(33,31,32,.18), 0 2px 6px rgba(33,31,32,.08)', padding: 14, boxSizing: 'border-box', color: 'var(--text-primary)', ...style }}>{children}</div>;
}
function MiniLabel({ children }) { return <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '.04em', marginBottom: 6 }}>{children}</div>; }
function MiniComp({ id, label, v }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
      <span style={{ width: 24, fontWeight: 700 }}>{id}</span>
      <span style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--border-subtle)' }}><span style={{ display: 'block', width: (v / 200) * 100 + '%', height: '100%', borderRadius: 3, background: v >= 160 ? 'var(--success-solid)' : v >= 120 ? 'var(--info-solid)' : 'var(--warning-solid)' }} /></span>
      <span style={{ width: 28, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>{v}</span>
    </div>
  );
}
function Underline({ color = 'var(--brand)' }) {
  return <svg aria-hidden="true" viewBox="0 0 300 18" preserveAspectRatio="none" style={{ position: 'absolute', left: '-2%', bottom: '-0.18em', width: '104%', height: '0.32em', overflow: 'visible' }}><path d="M3 12 C 70 4, 160 3, 297 9" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" /></svg>;
}
function Eyebrow({ children, dark }) { return <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: dark ? '#FF85C6' : 'var(--text-brand)' }}><span style={{ width: 18, height: 2, background: 'currentColor', borderRadius: 1 }} />{children}</span>; }
function Slot({ id, label, style, radius = 16 }) {
  return <div style={{ position: 'relative', background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderRadius: radius, ...style }}><image-slot id={id} shape="rounded" radius={String(radius)} placeholder={label} style={{ width: '100%', height: '100%', display: 'block' }}></image-slot></div>;
}
function FeatureRow({ flip, eyebrow, title, accent, text, bullets, media }) {
  const { Icon } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <div className={'feat' + (flip ? ' flip' : '')}>
      <div className="feat-media">{media}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 style={{ fontSize: 'clamp(28px,3.2vw,40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}>{title} <span style={{ color: 'var(--brand)' }}>{accent}</span></h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 480 }}>{text}</p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>{bullets.map((b) => <li key={b} style={{ display: 'flex', gap: 10, fontSize: 15 }}><Icon name="check" size={18} color="var(--brand)" strokeWidth={2.4} />{b}</li>)}</ul>
      </div>
    </div>
  );
}
function SiteHomeV2({ go }) {
  const { Button, Icon, StatusBadge, Avatar, AttendanceRow, GradeChart } = window.RedaONotaMilDesignSystem_cfb76c;
  const subjects = [['pen-line', 'Redação'], ['sigma', 'Matemática'], ['atom', 'Exatas'], ['spell-check', 'Gramática'], ['leaf', 'Biologia'], ['languages', 'Inglês'], ['user-round-check', 'Reforço individual']];
  return (
    <main>
      {/* HERO */}
      <section style={{ background: '#211F20', color: '#fff', overflow: 'hidden' }}>
        <div className="hero">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative', zIndex: 1 }}>
            <Eyebrow dark>Curso preparatório · Goiânia</Eyebrow>
            <h1 style={{ color: '#fff', fontSize: 'clamp(40px,5.6vw,72px)', lineHeight: 1.04, letterSpacing: '-0.03em', fontWeight: 600 }}>
              Escrever bem<br />se aprende com <span style={{ position: 'relative', color: '#FF4DB0', whiteSpace: 'nowrap' }}>método<Underline color="#EC008B" /></span>.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#B9BABD', maxWidth: 470 }}>Redação e disciplinas complementares para ENEM, vestibulares e concursos — com produção semanal, devolutiva por competência e acompanhamento próximo de alunos e responsáveis.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button size="lg" onClick={() => go('contato')}>Agendar aula experimental</Button>
              <button onClick={() => go('cursos')} style={{ height: 48, padding: '0 20px', borderRadius: 8, border: '1px solid #57585A', background: 'transparent', color: '#fff', font: '600 15px var(--font-body)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>Conhecer os cursos <Icon name="arrow-right" size={18} /></button>
            </div>
          </div>
          <div className="hero-visual">
            <Slot id="site-hero" label="Foto: aluna escrevendo em sala de aula" style={{ position: 'absolute', left: '14%', right: '6%', top: '10%', bottom: '8%' }} />
            <Float className="f1" style={{ left: 0, top: '4%', width: 230 }}>
              <MiniLabel>PRÓXIMA AULA</MiniLabel>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ textAlign: 'center', paddingRight: 10, borderRight: '1px solid var(--border-default)' }}><div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-brand)' }}>QUA</div><div style={{ font: '600 20px var(--font-display)', lineHeight: 1 }}>12</div></div>
                <div style={{ minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600 }}>Proposta de intervenção</div><div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>19h30 · Sala 2</div></div>
              </div>
            </Float>
            <Float className="f2" style={{ right: 0, top: '30%', width: 236 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}><MiniLabel>DEVOLUTIVA</MiniLabel><span style={{ font: '700 22px var(--font-display)', fontVariantNumeric: 'tabular-nums' }}>680</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}><MiniComp id="C1" v={160} /><MiniComp id="C2" v={160} /><MiniComp id="C3" v={120} /><MiniComp id="C4" v={160} /><MiniComp id="C5" v={80} /></div>
            </Float>
            <Float className="f3" style={{ left: '4%', bottom: 0, width: 250, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check-check" size={18} /></span>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>Redação enviada</div><div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Responsável avisado no app</div></div>
            </Float>
          </div>
        </div>
      </section>
      {/* SUBJECTS STRIP */}
      <section style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 36px' }}>
          {subjects.map(([ic, l]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}><Icon name={ic} size={20} color="var(--brand)" />{l}</span>)}
        </div>
      </section>
      {/* FEATURES */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px', display: 'flex', flexDirection: 'column', gap: 112 }}>
        <FeatureRow eyebrow="Produção semanal" title="Cada redação volta com" accent="um caminho." text="Propostas com prazo no app e correção pelas cinco competências do ENEM. O aluno sabe exatamente o que manter e o que ajustar na próxima." bullets={['Correção por competência, com comentário', 'Envio por foto ou PDF', 'Prazos e lembretes no celular']}
          media={<><Slot id="site-f1" label="Foto: professora corrigindo redação" style={{ position: 'absolute', inset: '0 18% 10% 0' }} />
            <Float className="fm" style={{ right: 0, bottom: 0, width: 260 }}><MiniLabel>C3 · ARGUMENTAÇÃO</MiniLabel><div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>Os argumentos são pertinentes. Inclua um exemplo concreto no segundo parágrafo.</div><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}><Avatar name="Marina Rocha" size="xs" /><span style={{ fontSize: 12, fontWeight: 600 }}>Prof. Marina</span></div></Float></>} />
        <FeatureRow flip eyebrow="Para responsáveis" title="Acompanhar sem" accent="precisar perguntar." text="Frequência, avisos da turma e mensalidades no mesmo app. Quem tem mais de um filho matriculado troca de aluno com um toque." bullets={['Chamada registrada a cada aula', 'Avisos com confirmação de leitura', 'Mensalidade com Pix']}
          media={<><Slot id="site-f2" label="Foto: mãe e filho olhando o celular" style={{ position: 'absolute', inset: '0 0 12% 16%' }} />
            <Float className="fm" style={{ left: 0, bottom: 0, width: 300, padding: 0, overflow: 'hidden' }}><AttendanceRow name="Lucas Mendes" status="present" readOnly divider={false} detail="Qua, 12/11" /></Float>
            <Float className="fm" style={{ left: '6%', top: '8%', width: 200, display: 'flex', alignItems: 'center', gap: 8 }}><StatusBadge tone="success" label="Mensalidade em dia" /></Float></>} />
        <FeatureRow eyebrow="Evolução" title="Progresso que" accent="dá para ver." text="Notas por competência e por semana em um gráfico simples, com uma meta pessoal definida com o professor." bullets={['Histórico de todas as redações', 'Meta pessoal acordada', 'Materiais disponíveis offline']}
          media={<><Slot id="site-f3" label="Foto: alunos estudando juntos" style={{ position: 'absolute', inset: '16% 22% 0 0' }} />
            <Float className="fm" style={{ right: 0, top: 0, width: 300, paddingTop: 16 }}><MiniLabel>EVOLUÇÃO DAS NOTAS</MiniLabel><div style={{ paddingTop: 18 }}><GradeChart height={100} goal={800} goalLabel="Meta" data={[{ label: 'Ago', value: 600 }, { label: 'Set', value: 640 }, { label: 'Out', value: 620 }, { label: 'Nov', value: 680 }]} /></div></Float></>} />
      </section>
      {/* COURSES */}
      <section style={{ background: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <h2 style={{ fontSize: 'clamp(28px,3.2vw,40px)', textAlign: 'center' }}>Conheça os nossos <span style={{ color: 'var(--brand)' }}>cursos</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
            {[['pen-line', 'Redação ENEM', 'Produção semanal e correção pelas cinco competências.'], ['landmark', 'Vestibulares e concursos', 'Gêneros e bancas específicas, com prática orientada.'], ['user-round-check', 'Reforço individual', 'Aulas particulares no ritmo de cada aluno, em qualquer disciplina.']].map(([ic, t, d]) => (
              <div key={t} style={{ background: 'var(--surface-card)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center' }}>
                <span style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-brand-soft)', color: 'var(--text-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={ic} size={24} /></span>
                <span style={{ font: '600 20px var(--font-display)' }}>{t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-secondary)', flex: 1 }}>{d}</span>
                <button onClick={() => go('cursos')} style={{ border: 0, background: 'transparent', color: 'var(--text-link)', font: '600 15px var(--font-body)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, padding: 8 }}>Ver detalhes <Icon name="arrow-right" size={16} /></button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', alignSelf: 'center', marginRight: 4 }}>Também oferecemos:</span>
            {['Matemática', 'Exatas', 'Gramática', 'Biologia', 'Inglês'].map((s) => <span key={s} style={{ height: 36, padding: '0 14px', borderRadius: 999, background: 'var(--surface-card)', border: '1px solid var(--border-default)', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 500 }}>{s}</span>)}
          </div>
          <figure style={{ margin: 0, background: 'var(--bg-brand-soft)', borderRadius: 16, padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Icon name="quote" size={32} color="var(--brand)" />
            <blockquote style={{ margin: 0, font: '500 clamp(20px,2.2vw,28px)/1.4 var(--font-display)', color: 'var(--text-primary)', maxWidth: 860 }}>Espaço para o depoimento real de um aluno ou responsável — envie o texto e a autorização de uso.</blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Avatar name="Nome Sobrenome" size="md" /><div><div style={{ fontWeight: 600, fontSize: 14 }}>Nome Sobrenome</div><div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Aluno(a) · curso</div></div></figcaption>
          </figure>
        </div>
      </section>
      {/* AUDIENCES */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 style={{ fontSize: 'clamp(28px,3.2vw,40px)', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>Preparação pensada para cada etapa</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 24 }}>
          {[['site-a1', 'Para o ENEM', 'Foto: estudantes do ensino médio'], ['site-a2', 'Para vestibulares e concursos', 'Foto: estudante adulto revisando'], ['site-a3', 'Para o reforço escolar', 'Foto: aula particular']].map(([id, t, l]) => (
            <button key={id} onClick={() => go('cursos')} style={{ border: 0, background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Slot id={id} label={l} style={{ width: '100%', aspectRatio: '4 / 3' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '600 18px var(--font-display)' }}>{t}<Icon name="arrow-up-right" size={18} color="var(--brand)" /></span>
            </button>
          ))}
        </div>
      </section>
      {/* DIFFERENCE */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 style={{ fontSize: 'clamp(28px,3.2vw,40px)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.2 }}>O jeito Nota Mil: <span style={{ position: 'relative', color: 'var(--brand)', whiteSpace: 'nowrap' }}>perto de você<Underline /></span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
          {[['users', 'Turmas próximas', 'Professores que conhecem cada aluno pelo nome e pelo texto.'], ['clipboard-check', 'Método organizado', 'Plano semanal, prazos claros e devolutiva sempre pelo mesmo critério.'], ['smartphone', 'Tudo no celular', 'Aulas, materiais, notas e avisos no app para alunos e responsáveis.']].map(([ic, t, d]) => (
            <div key={t} style={{ border: '1px solid var(--border-default)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Icon name={ic} size={24} color="var(--brand)" />
              <span style={{ font: '600 19px var(--font-display)' }}>{t}</span>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{d}</span>
            </div>
          ))}
        </div>
      </section>
      {/* CTA */}
      <section style={{ background: 'var(--bg-brand-soft)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '88px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(30px,3.6vw,48px)', lineHeight: 1.15 }}>Pronto para dar o <span style={{ color: 'var(--brand)' }}>próximo passo</span>?</h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 520 }}>Agende uma aula experimental e conheça a turma, os professores e o método.</p>
          <Button size="lg" onClick={() => go('contato')}>Agendar aula experimental</Button>
        </div>
      </section>
    </main>
  );
}
function SiteFooterV2({ go }) {
  const { Icon } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <footer style={{ background: '#211F20', color: '#B9BABD' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 32px', display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: 'span 2', minWidth: 0 }}>
            <span style={{ background: '#fff', borderRadius: 12, padding: 12, alignSelf: 'flex-start', display: 'flex' }}><img src="../../assets/logo-redacao-1000.png" alt="Redação Nota Mil" style={{ height: 52 }} /></span>
            <span style={{ fontSize: 15, color: '#F2F2F3', fontWeight: 600, marginTop: 8 }}>Receba datas de simulados e novidades</span>
            <div style={{ display: 'flex', maxWidth: 360, height: 48, borderRadius: 8, background: '#2A2829', border: '1px solid #57585A', overflow: 'hidden' }}>
              <input aria-label="Seu e-mail" placeholder="seu@email.com" style={{ flex: 1, minWidth: 0, border: 0, background: 'transparent', color: '#fff', padding: '0 14px', font: '16px var(--font-body)', outline: 'none' }} />
              <button aria-label="Inscrever" style={{ width: 48, border: 0, background: '#D1007B', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="arrow-right" size={20} /></button>
            </div>
          </div>
          {[['Cursos', ['Redação ENEM', 'Vestibulares', 'Concursos', 'Reforço individual']], ['Disciplinas', ['Matemática', 'Exatas', 'Gramática', 'Biologia', 'Inglês']], ['Acesso', ['Área do aluno', 'Responsáveis', 'Professores', 'Contato']]].map(([t, ls]) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}><span style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>{t}</span>{ls.map((l) => <a key={l} href="#" onClick={(e) => { e.preventDefault(); go(l === 'Contato' ? 'contato' : l === 'Área do aluno' ? 'login' : 'cursos'); }} style={{ color: '#B9BABD', textDecoration: 'none' }}>{l}</a>)}</div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid #3A393B', fontSize: 13 }}>
          <span>Redação Nota Mil · Goiânia, GO</span>
          <div style={{ display: 'flex', gap: 8 }}>{[['instagram', 'Instagram'], ['youtube', 'YouTube'], ['message-circle', 'WhatsApp']].map(([ic, l]) => <a key={l} href="#" aria-label={l} style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid #3A393B', color: '#F2F2F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={ic} size={18} /></a>)}</div>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { SiteHomeV2, SiteFooterV2 });
