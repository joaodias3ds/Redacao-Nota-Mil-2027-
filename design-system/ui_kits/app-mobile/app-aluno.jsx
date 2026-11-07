function StudentApp({ dark, setDark }) {
  const { BottomNav, IconButton, ClassCard, MaterialItem, AnnouncementCard, Button, StatusBadge, ScheduleCalendar, Tabs, EssayFeedback, GradeChart, FileUpload, Alert, FilterChip, Switch, ListItem, Avatar, StateView, Skeleton } = window.RedaONotaMilDesignSystem_cfb76c;
  const [tab, setTab] = React.useState('inicio');
  const [sub, setSub] = React.useState(null);
  const [conf, setConf] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [sent, setSent] = React.useState(false);
  const [mf, setMf] = React.useState('todos');
  const [loading, setLoading] = React.useState(false);
  const goTab = (t) => { setSub(null); setTab(t); if (t === 'materiais') { setLoading(true); setTimeout(() => setLoading(false), 700); } };
  const nav = <BottomNav value={tab} onChange={goTab} items={[{ id: 'inicio', label: 'Início', icon: 'house' }, { id: 'agenda', label: 'Agenda', icon: 'calendar-days' }, { id: 'redacoes', label: 'Redações', icon: 'pen-line', badge: 1 }, { id: 'materiais', label: 'Materiais', icon: 'folder-open' }, { id: 'perfil', label: 'Perfil', icon: 'circle-user-round' }]} />;
  const comps = [{ id: 'C1', label: 'Norma padrão', score: 160 }, { id: 'C2', label: 'Compreensão da proposta', score: 160 }, { id: 'C3', label: 'Argumentação', score: 120, comment: 'Inclua um exemplo concreto no segundo parágrafo.' }, { id: 'C4', label: 'Coesão', score: 160 }, { id: 'C5', label: 'Proposta de intervenção', score: 80, comment: 'Detalhe agente e meio de execução.' }];
  if (sub === 'enviar') return (
    <AppScreen title="Enviar redação" onBack={() => { setSub(null); setSent(false); setFiles([]); }} nav={null}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Semana 4 · até sex, 23h59</span><span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>Tema de exemplo: desafios da mobilidade urbana</span></div>
      {sent ? <Alert tone="success" title="Redação enviada">A devolutiva chega em até 7 dias. Você será avisado.</Alert> : <>
        <FileUpload label="Foto ou PDF da redação" files={files} onFiles={(fs) => { setFiles([{ name: fs[0].name, status: 'uploading', progress: 40 }]); setTimeout(() => setFiles([{ name: fs[0].name, status: 'done' }]), 900); }} onRemove={() => setFiles([])} />
        <Button variant="secondary" fullWidth size="lg" iconLeft="camera" onClick={() => { setFiles([{ name: 'foto-redacao.jpg', status: 'uploading', progress: 55 }]); setTimeout(() => setFiles([{ name: 'foto-redacao.jpg', status: 'done' }]), 900); }}>Tirar foto</Button>
        <Button fullWidth size="lg" iconLeft="send" disabled={!files.length || files[0].status !== 'done'} onClick={() => setSent(true)}>Enviar redação</Button>
      </>}
    </AppScreen>
  );
  if (sub === 'devolutiva') return (
    <AppScreen title="Devolutiva" onBack={() => setSub(null)} nav={nav}>
      <EssayFeedback theme="Tema de exemplo: o papel da leitura na formação do jovem" submittedAt="03/11" correctedBy="Prof. Marina" competencies={comps} expandedId="C3" />
    </AppScreen>
  );
  if (tab === 'agenda') return (
    <AppScreen title="Agenda" nav={nav}>
      <Tabs variant="segmented" fullWidth items={[{ id: 's', label: 'Esta semana' }, { id: 'p', label: 'Próxima' }]} value="s" />
      <ScheduleCalendar mode="agenda" todayId="qua" days={[{ id: 'seg', weekday: 'SEG', day: 10, events: [{ start: '19h', end: '20h30', title: 'Redação · Noite A', place: 'Sala 2' }] }, { id: 'ter', weekday: 'TER', day: 11, events: [] }, { id: 'qua', weekday: 'QUA', day: 12, events: [{ start: '19h30', end: '21h', title: 'Redação · Noite A', place: 'Sala 2', status: 'changed' }] }, { id: 'qui', weekday: 'QUI', day: 13, events: [{ start: '10h', end: '11h', title: 'Gramática', status: 'cancelled' }] }, { id: 'sex', weekday: 'SEX', day: 14, events: [{ start: '14h', end: '15h', title: 'Plantão de dúvidas', place: 'Online' }] }]} />
    </AppScreen>
  );
  if (tab === 'redacoes') return (
    <AppScreen title="Redações" nav={nav}>
      <div style={{ ...appBox, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 600 }}>Semana 4</span><StatusBadge size="sm" tone="warning" label="Pendente" /></div><span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Entrega até sexta, 23h59</span><Button fullWidth size="lg" iconLeft="upload" onClick={() => setSub('enviar')}>Enviar redação</Button></div>
      <Section title="Evolução"><div style={{ ...appBox, padding: '28px 16px 16px' }}><GradeChart height={140} goal={800} goalLabel="Meta" data={[{ label: 'Jul', value: 560 }, { label: 'Ago', value: 600 }, { label: 'Set', value: 640 }, { label: 'Out', value: 620 }, { label: 'Nov', value: 680 }]} /></div></Section>
      <Section title="Corrigidas"><div style={appBox}>{[['Semana 3', '680'], ['Semana 2', '620'], ['Semana 1', '600']].map(([t, n], i) => <ListItem key={t} leadingIcon="file-check" title={t} subtitle={'Nota ' + n + ' · ver devolutiva'} chevron divider={i < 2} onClick={() => setSub('devolutiva')} />)}</div></Section>
    </AppScreen>
  );
  if (tab === 'materiais') return (
    <AppScreen title="Materiais" nav={nav} actions={<IconButton icon="search" label="Buscar" />}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>{[['todos', 'Todos'], ['red', 'Redação'], ['gram', 'Gramática'], ['mat', 'Matemática']].map(([id, l]) => <FilterChip key={id} label={l} selected={mf === id} onClick={() => setMf(id)} />)}</div>
      {loading ? <div style={{ ...appBox, padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>{[1, 2, 3].map((i) => <div key={i} style={{ display: 'flex', gap: 12 }}><Skeleton width={40} height={40} radius={8} /><div style={{ flex: 1 }}><Skeleton lines={2} height={12} /></div></div>)}</div> :
        mf === 'mat' ? <div style={appBox}><StateView kind="empty" title="Nenhum material de Matemática" message="Quando o professor publicar, ele aparece aqui." /></div> :
        <div style={appBox}><MaterialItem type="pdf" title="Estrutura do texto dissertativo" meta="2,4 MB" status="new" offline /><MaterialItem type="video" title="Aula 11 · Repertório" meta="18 min" /><MaterialItem type="activity" title="Lista de exercícios 4" due="Até sex" status="pending" /><MaterialItem type="slides" title="Coesão e coerência" meta="Gramática" divider={false} /></div>}
    </AppScreen>
  );
  if (tab === 'perfil') return (
    <AppScreen title="Perfil" nav={nav}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Avatar name="Ana Beatriz Lima" size="xl" /><div><div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>Ana Beatriz Lima</div><div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Redação ENEM · Noite A</div></div></div>
      <div style={{ ...appBox, padding: '0 16px' }}><Switch label="Avisos da turma" checked /><Switch label="Lembrete de aula" description="30 minutos antes" checked /><Switch label="Tema escuro" checked={dark} onChange={setDark} /></div>
      <div style={appBox}><ListItem leadingIcon="lock" title="Alterar senha" chevron onClick={() => {}} /><ListItem leadingIcon="circle-help" title="Ajuda" chevron onClick={() => {}} /><ListItem leadingIcon="log-out" title="Sair" divider={false} onClick={() => {}} /></div>
    </AppScreen>
  );
  return (
    <AppScreen title="Olá, Ana" nav={nav} actions={<IconButton icon="bell" label="Avisos" badge={1} />}>
      <ClassCard course="Redação ENEM" className="Turma Noite A" teacher="Marina Rocha" tag={<StatusBadge size="sm" tone="warning" label="Horário alterado" />} nextLesson={{ weekday: 'HOJE', day: 12, title: 'Proposta de intervenção', time: '19h30–21h00', place: 'Sala 2' }} onClick={() => goTab('agenda')} />
      <Section title="Para fazer" action={<Button size="sm" variant="ghost" onClick={() => goTab('redacoes')}>Ver tudo</Button>}>
        <div style={appBox}><MaterialItem type="essay" title="Redação da semana 4" due="Até sex, 23h59" status="pending" onClick={() => setSub('enviar')} /><MaterialItem type="activity" title="Lista de exercícios 4" due="Até sex" status="pending" divider={false} onClick={() => goTab('materiais')} /></div>
      </Section>
      <Section title="Avisos">
        <AnnouncementCard read={conf} author="Coordenação" audience="Noite A" date="Hoje, 09h12" title="Simulado no sábado" body="Início às 8h. Traga documento com foto e caneta preta." requiresConfirmation confirmed={conf} onConfirm={() => setConf(true)} />
      </Section>
    </AppScreen>
  );
}
window.StudentApp = StudentApp;
