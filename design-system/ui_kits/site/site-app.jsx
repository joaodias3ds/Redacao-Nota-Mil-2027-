function SiteHeader({ page, go }) {
  const { Button, IconButton } = window.RedaONotaMilDesignSystem_cfb76c;
  const [open, setOpen] = React.useState(false);
  const links = [['home', 'Início'], ['cursos', 'Cursos'], ['sobre', 'Sobre'], ['contato', 'Contato']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'flex' }}><img src="../../assets/logo-redacao-1000.png" alt="Redação Nota Mil" style={{ height: 44 }} /></a>
        <nav className="site-nav" style={{ display: 'flex', gap: 4, flex: 1 }}>
          {links.map(([id, l]) => (
            <a key={id} href="#" onClick={(e) => { e.preventDefault(); go(id); }} style={{ padding: '10px 14px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: page === id ? 600 : 500, color: page === id ? 'var(--selected-fg)' : 'var(--text-primary)', background: page === id ? 'var(--selected-bg)' : 'transparent' }}>{l}</a>
          ))}
        </nav>
        <div className="site-cta" style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" iconLeft="log-in" onClick={() => go('login')}>Área do aluno</Button>
          <Button onClick={() => go('contato')}>Agendar aula experimental</Button>
        </div>
        <span className="site-burger" style={{ display: 'none', marginLeft: 'auto' }}><IconButton icon={open ? 'x' : 'menu'} label="Menu" onClick={() => setOpen(!open)} /></span>
      </div>
      {open && <div style={{ padding: '8px 24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>{links.map(([id, l]) => <a key={id} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); go(id); }} style={{ padding: 12, fontSize: 16, color: 'var(--text-primary)', textDecoration: 'none' }}>{l}</a>)}<Button fullWidth onClick={() => go('contato')}>Agendar aula experimental</Button></div>}
    </header>
  );
}
function Photo({ label, h = 360, r = 16 }) {
  return <div style={{ height: h, borderRadius: r, background: 'var(--bg-subtle)', border: '1px dashed var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', padding: 16 }}>{label}</div>;
}
const SITE_COURSES = [
  ['pen-line', 'Redação', 'ENEM, vestibulares e concursos, com correção por competência.'],
  ['sigma', 'Matemática', 'Base sólida e resolução de questões.'],
  ['atom', 'Exatas', 'Física e Química com foco em interpretação.'],
  ['spell-check', 'Gramática', 'Norma padrão aplicada à escrita.'],
  ['leaf', 'Biologia', 'Conteúdo organizado por eixos do ENEM.'],
  ['languages', 'Inglês', 'Leitura e interpretação de textos.'],
  ['user-round-check', 'Reforço individual', 'Aulas particulares no ritmo do aluno.'],
];
function SiteHome({ go }) {
  const { Button, Icon } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <main>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 48, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ alignSelf: 'flex-start', padding: '6px 12px', borderRadius: 999, background: 'var(--bg-brand-soft)', color: 'var(--selected-fg)', fontSize: 13, fontWeight: 600 }}>Curso preparatório em Goiânia</span>
          <h1 style={{ fontSize: 'var(--text-display-size)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Escrita clara, preparação <span style={{ color: 'var(--brand)' }}>organizada</span>.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 520 }}>Redação e disciplinas complementares para ENEM, vestibulares e concursos — com acompanhamento próximo de alunos, responsáveis e professores.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><Button size="lg" onClick={() => go('contato')}>Agendar aula experimental</Button><Button size="lg" variant="secondary" iconRight="arrow-right" onClick={() => go('cursos')}>Conhecer os cursos</Button></div>
        </div>
        <Photo label="Foto: aluno escrevendo em sala de aula (luz natural, tons claros)" h={420} />
      </section>
      <section style={{ background: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><h2 style={{ fontSize: 'var(--text-h2-size)' }}>Cursos</h2><p style={{ color: 'var(--text-secondary)' }}>Escolha por disciplina ou combine com reforço individual.</p></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {SITE_COURSES.map(([ic, t, d]) => (
              <button key={t} onClick={() => go('cursos')} style={{ textAlign: 'left', font: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12, padding: 24, borderRadius: 12, border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'inherit' }}>
                <span style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--bg-brand-soft)', color: 'var(--text-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={ic} size={22} /></span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>{t}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{d}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 24 }}>
        {[['calendar-check', 'Aula experimental', 'Conheça a turma e o método antes de se matricular.'], ['pen-line', 'Produção semanal', 'Propostas de redação com prazos e devolutiva.'], ['chart-line', 'Evolução visível', 'Notas por competência no app do aluno.'], ['users', 'Responsáveis por perto', 'Frequência, avisos e mensalidades no celular.']].map(([ic, t, d]) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Icon name={ic} size={24} color="var(--brand)" /><span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, marginTop: 4 }}>{t}</span><span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{d}</span></div>
        ))}
      </section>
      <section style={{ maxWidth: 1200, margin: '0 auto 64px', padding: '0 24px' }}>
        <div style={{ borderRadius: 16, background: 'var(--surface-inverse)', color: '#fff', padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><h2 style={{ color: '#fff', fontSize: 'var(--text-h3-size)' }}>Vamos conversar sobre os seus objetivos?</h2><span style={{ color: '#B9BABD' }}>Atendimento de segunda a sábado.</span></div>
          <Button size="lg" iconLeft="message-circle" onClick={() => go('contato')}>Falar com a equipe</Button>
        </div>
      </section>
    </main>
  );
}
function SiteCourse({ go }) {
  const { Button, Tabs, Icon, StatusBadge } = window.RedaONotaMilDesignSystem_cfb76c;
  const [tab, setTab] = React.useState('enem');
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 64px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}><a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Início</a><span>/</span><span>Cursos</span><span>/</span><span style={{ color: 'var(--text-primary)' }}>Redação</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h1 style={{ fontSize: 'var(--text-h1-size)' }}>Redação</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>Do planejamento do texto à proposta de intervenção, com produção semanal e devolutiva por competência.</p>
          <Tabs items={[{ id: 'enem', label: 'ENEM' }, { id: 'vest', label: 'Vestibulares' }, { id: 'conc', label: 'Concursos' }]} value={tab} onChange={setTab} />
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Aulas presenciais em turmas reduzidas', 'Propostas semanais com prazo no app', 'Correção pelas cinco competências', 'Plantão de dúvidas'].map((t) => <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16 }}><Icon name="circle-check" size={20} color="var(--success-solid)" />{t}</li>)}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, border: '1px solid var(--border-default)', borderRadius: 16, alignSelf: 'start' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>Turmas abertas</span>
          {[['Manhã', 'Seg e qua · 8h00–9h30', 'success', 'Vagas abertas'], ['Noite', 'Ter e qui · 19h00–20h30', 'warning', 'Últimas vagas'], ['Sábado', 'Sáb · 9h00–11h00', 'neutral', 'Lista de espera']].map(([t, h, tone, l]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{t}</div><div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{h}</div></div><StatusBadge tone={tone} label={l} size="sm" />
            </div>
          ))}
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Horários fictícios de exemplo.</span>
          <Button fullWidth size="lg" onClick={() => go('contato')}>Quero uma aula experimental</Button>
        </div>
      </div>
    </main>
  );
}
function SiteContact() {
  const { Button, TextField, Select, TextArea, Checkbox, Alert } = window.RedaONotaMilDesignSystem_cfb76c;
  const [f, setF] = React.useState({ nome: '', tel: '', email: '', curso: '', msg: '', ok: false });
  const [err, setErr] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = () => {
    const e = {};
    if (f.nome.trim().length < 3) e.nome = 'Informe o nome completo.';
    if (f.tel.replace(/\D/g, '').length < 10) e.tel = 'Informe um telefone com DDD, como (62) 90000-0000.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Informe um e-mail válido, como nome@email.com.';
    if (!f.curso) e.curso = 'Escolha um curso.';
    if (!f.ok) e.ok = true;
    setErr(e);
    if (!Object.keys(e).length) { setLoading(true); setTimeout(() => { setLoading(false); setSent(true); }, 900); }
  };
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><h1 style={{ fontSize: 'var(--text-h2-size)' }}>Agendar aula experimental</h1><p style={{ color: 'var(--text-secondary)' }}>Respondemos pelo telefone ou e-mail informado.</p></div>
      {sent ? <Alert tone="success" title="Pedido recebido">Nossa equipe entra em contato para combinar o melhor horário.</Alert> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField label="Nome completo" required value={f.nome} onChange={set('nome')} error={err.nome} autoComplete="name" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 16 }}>
            <TextField label="Telefone / WhatsApp" type="tel" required value={f.tel} onChange={set('tel')} error={err.tel} inputMode="tel" placeholder="(62) 90000-0000" />
            <TextField label="E-mail" type="email" required value={f.email} onChange={set('email')} error={err.email} placeholder="nome@email.com" />
          </div>
          <Select label="Curso de interesse" required placeholder="Selecione" options={SITE_COURSES.map((c) => c[1])} value={f.curso} onChange={set('curso')} error={err.curso} />
          <TextArea label="Mensagem" optional rows={3} maxLength={400} value={f.msg} onChange={set('msg')} helper="Conte o objetivo: ENEM, vestibular, concurso ou reforço." />
          <Checkbox label="Autorizo o contato da equipe Redação Nota Mil" checked={f.ok} onChange={(v) => setF({ ...f, ok: v })} error={err.ok} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}><Button size="lg" loading={loading} onClick={submit}>Enviar pedido</Button></div>
        </div>
      )}
    </main>
  );
}
function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 32, fontSize: 14, color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><span style={{ background: '#fff', borderRadius: 12, padding: 12, alignSelf: 'flex-start', display: 'flex' }}><img src="../../assets/logo-redacao-1000.png" alt="Redação Nota Mil" style={{ height: 48 }} /></span><span>Goiânia · GO</span></div>
        {[['Cursos', ['Redação', 'Matemática', 'Exatas', 'Gramática', 'Biologia', 'Inglês']], ['Institucional', ['Sobre', 'Professores', 'Trabalhe conosco']], ['Acesso', ['Área do aluno', 'Responsáveis', 'Professores']]].map(([t, ls]) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t}</span>{ls.map((l) => <a key={l} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{l}</a>)}</div>
        ))}
      </div>
    </footer>
  );
}
function SiteLogin({ go }) {
  const { Button, TextField } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <main style={{ maxWidth: 400, margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontSize: 'var(--text-h3-size)' }}>Entrar</h1>
      <p style={{ color: 'var(--text-secondary)', marginTop: -8 }}>Alunos, responsáveis e professores.</p>
      <TextField label="E-mail ou matrícula" />
      <TextField label="Senha" type="password" />
      <a href="#" style={{ fontSize: 14, fontWeight: 600, alignSelf: 'flex-end' }}>Esqueci minha senha</a>
      <Button size="lg" fullWidth onClick={() => go('home')}>Entrar</Button>
    </main>
  );
}
function SiteApp() {
  const [page, setPage] = React.useState(() => localStorage.getItem('rnm-site-page') || 'home');
  const go = (p) => { setPage(p); localStorage.setItem('rnm-site-page', p); window.scrollTo(0, 0); };
  const Home = window.SiteHomeV2 || SiteHome;
  const Footer = window.SiteFooterV2 || SiteFooter;
  const P = { home: Home, cursos: SiteCourse, sobre: Home, contato: SiteContact, login: SiteLogin }[page] || Home;
  return <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><SiteHeader page={page} go={go} /><div style={{ flex: 1 }}><P go={go} /></div><Footer go={go} /></div>;
}
window.SiteApp = SiteApp;
