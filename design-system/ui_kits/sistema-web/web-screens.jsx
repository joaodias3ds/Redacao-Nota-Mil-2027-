const WEB_STUDENTS = [
  { id: 1, nome: 'Ana Beatriz Lima', turma: 'Redação · Noite A', resp: 'Carla Lima', freq: 92, media: 720, fin: 'paid' },
  { id: 2, nome: 'João Pedro Alves', turma: 'Redação · Noite A', resp: 'Marcos Alves', freq: 78, media: 640, fin: 'pending' },
  { id: 3, nome: 'Marina Souza', turma: 'Redação · Manhã B', resp: 'Helena Souza', freq: 64, media: 580, fin: 'overdue' },
  { id: 4, nome: 'Rafael Costa', turma: 'Matemática · Tarde', resp: 'Paula Costa', freq: 88, media: 700, fin: 'paid' },
  { id: 5, nome: 'Lucas Mendes', turma: 'Redação · Noite A', resp: 'Carla Mendes', freq: 95, media: 760, fin: 'paid' },
  { id: 6, nome: 'Sofia Mendes', turma: 'Reforço individual', resp: 'Carla Mendes', freq: 100, media: null, fin: 'processing' },
];
const FIN = { paid: ['success', 'Em dia'], pending: ['warning', 'A vencer'], overdue: ['danger', 'Em atraso'], processing: ['info', 'Processando'] };
function Kpi({ icon, label, value, note, tone }) {
  const { Icon } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <div style={{ padding: 16, border: '1px solid var(--border-default)', borderRadius: 12, background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}><Icon name={icon} size={16} />{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 13, color: tone ? 'var(--' + tone + '-fg)' : 'var(--text-muted)' }}>{note}</div>
    </div>
  );
}
function PageHead({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 280px', minWidth: 0 }}><h1 style={{ fontSize: 26, textWrap: 'pretty' }}>{title}</h1>{subtitle && <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{subtitle}</span>}</div>
      {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
    </div>
  );
}
function AdminDashboard({ go }) {
  const { Button, DataTable, StatusBadge, AnnouncementCard, Avatar, Alert } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Painel" subtitle="Semestre 2 · dados fictícios" actions={<><Button variant="secondary" iconLeft="download">Exportar</Button><Button iconLeft="user-plus" onClick={() => go('matricula')}>Nova matrícula</Button></>} />
      <Alert tone="warning" title="3 mensalidades em atraso" action={<Button size="sm" variant="secondary" onClick={() => go('financeiro')}>Ver mensalidades</Button>}>Envie um lembrete aos responsáveis.</Alert>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
        <Kpi icon="users" label="Alunos ativos" value="000" note="Valor de exemplo" />
        <Kpi icon="clipboard-check" label="Frequência média" value="00%" note="Últimos 30 dias" />
        <Kpi icon="pen-line" label="Redações a corrigir" value="00" note="Prazo médio: 0 dias" tone="warning" />
        <Kpi icon="wallet" label="Mensalidades em atraso" value="0" note="Requer atenção" tone="danger" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(280px,1fr)', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h2 style={{ fontSize: 18 }}>Matrículas recentes</h2><Button size="sm" variant="ghost" iconRight="arrow-right" onClick={() => go('alunos')}>Ver alunos</Button></div>
          <DataTable density="compact" columns={[{ key: 'nome', label: 'Aluno', render: (r) => <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Avatar name={r.nome} size="sm" />{r.nome}</span> }, { key: 'turma', label: 'Turma' }, { key: 'fin', label: 'Financeiro', render: (r) => <StatusBadge size="sm" tone={FIN[r.fin][0]} label={FIN[r.fin][1]} /> }]} rows={WEB_STUDENTS.slice(0, 4)} onRowClick={() => go('alunos')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontSize: 18 }}>Comunicados</h2>
          <AnnouncementCard read author="Coordenação" audience="Todas as turmas" date="Hoje" title="Simulado no sábado" body="Início às 8h. Documento com foto e caneta preta." confirmations={{ done: 21, total: 28 }} />
        </div>
      </div>
    </div>
  );
}
function AdminStudents() {
  const { Button, TextField, FilterChip, DataTable, Pagination, StatusBadge, Avatar, ActionMenu, Drawer, ProgressBar, ListItem, Toast } = window.RedaONotaMilDesignSystem_cfb76c;
  const [q, setQ] = React.useState('');
  const [f, setF] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const [sel, setSel] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const rows = WEB_STUDENTS.filter((s) => (f === 'all' || s.fin === f) && s.nome.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHead title="Alunos" subtitle={rows.length + ' alunos'} actions={<Button iconLeft="user-plus">Novo aluno</Button>} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField type="search" size="md" placeholder="Buscar por nome" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} style={{ width: 280 }} />
        {[['all', 'Todos', WEB_STUDENTS.length], ['paid', 'Em dia', 3], ['pending', 'A vencer', 1], ['overdue', 'Em atraso', 1]].map(([id, l, n]) => <FilterChip key={id} label={l} count={n} selected={f === id} onClick={() => setF(id)} />)}
      </div>
      <DataTable sortKey="nome" onRowClick={(r) => setSel(r)} selectedId={sel && sel.id} emptyText="Nenhum aluno encontrado com esses filtros."
        columns={[
          { key: 'nome', label: 'Aluno', sortable: true, render: (r) => <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Avatar name={r.nome} size="sm" /><span style={{ fontWeight: 500 }}>{r.nome}</span></span> },
          { key: 'turma', label: 'Turma' }, { key: 'resp', label: 'Responsável' },
          { key: 'freq', label: 'Frequência', numeric: true, render: (r) => <span style={{ color: r.freq < 75 ? 'var(--danger-fg)' : undefined, fontWeight: r.freq < 75 ? 600 : 400 }}>{r.freq}%</span> },
          { key: 'media', label: 'Média', numeric: true, render: (r) => r.media ?? '—' },
          { key: 'fin', label: 'Financeiro', render: (r) => <StatusBadge size="sm" tone={FIN[r.fin][0]} label={FIN[r.fin][1]} /> },
          { key: 'a', label: '', width: 48, render: (r) => <span onClick={(e) => e.stopPropagation()}><ActionMenu items={[{ id: 'ver', label: 'Ver ficha', icon: 'id-card' }, { id: 'msg', label: 'Enviar aviso', icon: 'send' }, { divider: true }, { id: 'tr', label: 'Trancar matrícula', icon: 'lock', tone: 'danger' }]} onSelect={(id) => id === 'ver' ? setSel(r) : setToast(id === 'msg' ? 'Aviso enviado ao responsável.' : 'Ação de exemplo.')} /></span> },
        ]} rows={rows} />
      <Pagination page={page} totalPages={5} totalItems={96} pageSize={20} onChange={setPage} />
      {sel && <Drawer title={sel.nome} subtitle={sel.turma} onClose={() => setSel(null)} footer={<><Button variant="secondary" fullWidth onClick={() => setSel(null)}>Fechar</Button><Button fullWidth iconLeft="pencil">Editar</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Avatar name={sel.nome} size="xl" /><div><div style={{ fontWeight: 600 }}>{sel.nome}</div><StatusBadge size="sm" tone={FIN[sel.fin][0]} label={FIN[sel.fin][1]} /></div></div>
          <ProgressBar label="Frequência" value={sel.freq} tone={sel.freq < 75 ? 'danger' : 'success'} />
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 12, overflow: 'hidden' }}>
            <ListItem dense leadingIcon="user-round" title={sel.resp} subtitle="Responsável" />
            <ListItem dense leadingIcon="book-open-text" title={sel.turma} subtitle="Turma" />
            <ListItem dense leadingIcon="chart-line" title={sel.media ? 'Média ' + sel.media : 'Sem notas'} subtitle="Redação" divider={false} />
          </div>
        </div>
      </Drawer>}
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }}><Toast tone="success" message={toast} onClose={() => setToast(null)} /></div>}
    </div>
  );
}
function AdminFinance() {
  const { DataTable, StatusBadge, Tabs, Button } = window.RedaONotaMilDesignSystem_cfb76c;
  const [t, setT] = React.useState('nov');
  const rows = WEB_STUDENTS.map((s) => ({ ...s, valor: 'R$ 000,00', venc: '10/11' }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHead title="Mensalidades" subtitle="Valores fictícios" actions={<Button variant="secondary" iconLeft="send">Lembrar em atraso</Button>} />
      <Tabs items={[{ id: 'set', label: 'Setembro' }, { id: 'out', label: 'Outubro' }, { id: 'nov', label: 'Novembro', count: 2 }]} value={t} onChange={setT} />
      <DataTable columns={[{ key: 'nome', label: 'Aluno' }, { key: 'resp', label: 'Responsável' }, { key: 'venc', label: 'Vencimento', numeric: true }, { key: 'valor', label: 'Valor', numeric: true }, { key: 'fin', label: 'Situação', render: (r) => <StatusBadge size="sm" tone={FIN[r.fin][0]} label={FIN[r.fin][1]} /> }]} rows={rows} />
    </div>
  );
}
function AdminEnroll() {
  const { EnrollmentStepper, TextField, Select, Radio, Button, Card, Checkbox } = window.RedaONotaMilDesignSystem_cfb76c;
  const [step, setStep] = React.useState(0);
  const [save, setSave] = React.useState('saved');
  const [turno, setTurno] = React.useState('noite');
  const steps = [{ label: 'Aluno' }, { label: 'Responsável' }, { label: 'Turma' }, { label: 'Revisão' }];
  const touch = () => { setSave('saving'); setTimeout(() => setSave('saved'), 700); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 760 }}>
      <PageHead title="Nova matrícula" />
      <EnrollmentStepper steps={steps} current={step} saveState={save} lastSaved="14h32" onStepClick={setStep} />
      <Card padding="lg">
        {step === 0 && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><TextField size="md" label="Nome completo" required onBlur={touch} style={{ gridColumn: '1 / -1' }} /><TextField size="md" label="Data de nascimento" type="date" /><TextField size="md" label="CPF" optional inputMode="numeric" placeholder="000.000.000-00" /><Select size="md" label="Escolaridade" options={['Ensino fundamental', 'Ensino médio', 'Concluído']} placeholder="Selecione" /></div>}
        {step === 1 && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><TextField size="md" label="Nome do responsável" required style={{ gridColumn: '1 / -1' }} onBlur={touch} /><TextField size="md" label="Telefone" type="tel" required /><TextField size="md" label="E-mail" type="email" required /><Checkbox label="Responsável financeiro é o mesmo" checked /></div>}
        {step === 2 && <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Select size="md" label="Curso" options={['Redação ENEM', 'Matemática', 'Reforço individual']} defaultValue="Redação ENEM" /><div role="radiogroup" style={{ marginTop: 8 }}>{[['manha', 'Manhã', 'Seg e qua · 8h'], ['noite', 'Noite', 'Ter e qui · 19h'], ['sab', 'Sábado', 'Lista de espera']].map(([v, l, d]) => <Radio key={v} name="turno" value={v} label={l} description={d} checked={turno === v} disabled={v === 'sab'} onChange={(x) => { setTurno(x); touch(); }} />)}</div></div>}
        {step === 3 && <div style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}>Revise os dados antes de concluir. Após a confirmação, o responsável recebe o acesso ao app.</div>}
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="secondary" disabled={step === 0} iconLeft="arrow-left" onClick={() => setStep(step - 1)}>Voltar</Button>
        <Button iconRight={step < 3 ? 'arrow-right' : 'check'} onClick={() => step < 3 && setStep(step + 1)}>{step < 3 ? 'Continuar' : 'Concluir matrícula'}</Button>
      </div>
    </div>
  );
}
function TeacherToday({ go }) {
  const { ClassCard, StatusBadge, MaterialItem, ScheduleCalendar } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Boa noite, Marina" subtitle="Quarta, 12 de novembro" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
        <ClassCard course="Redação ENEM" className="Turma Noite A" studentsCount={28} tag={<StatusBadge size="sm" tone="warning" label="Chamada pendente" />} nextLesson={{ weekday: 'HOJE', day: 12, title: 'Proposta de intervenção', time: '19h30–21h00', place: 'Sala 2' }} onClick={() => go('chamada')} />
        <ClassCard course="Redação ENEM" className="Turma Manhã B" studentsCount={22} tag={<StatusBadge size="sm" tone="success" label="Chamada feita" />} nextLesson={{ weekday: 'SEX', day: 14, title: 'Repertório sociocultural', time: '8h00–9h30', place: 'Sala 1' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 24 }}>
        <div><h2 style={{ fontSize: 18, marginBottom: 12 }}>Correções pendentes</h2><div style={{ border: '1px solid var(--border-default)', borderRadius: 12, overflow: 'hidden' }}>{['Ana Beatriz Lima', 'João Pedro Alves', 'Marina Souza'].map((n, i) => <MaterialItem key={n} type="essay" title={n} meta="Semana 3 · Noite A" due={i === 2 ? 'Prazo vencido' : 'Até sex'} status={i === 2 ? 'late' : 'pending'} divider={i < 2} onClick={() => go('correcoes')} />)}</div></div>
        <ScheduleCalendar mode="agenda" title="Próximos dias" todayId="qua" days={[{ id: 'qua', weekday: 'QUA', day: 12, events: [{ start: '19h30', end: '21h', title: 'Noite A', place: 'Sala 2', status: 'changed' }] }, { id: 'qui', weekday: 'QUI', day: 13, events: [] }, { id: 'sex', weekday: 'SEX', day: 14, events: [{ start: '8h', end: '9h30', title: 'Manhã B', place: 'Sala 1' }] }]} />
      </div>
    </div>
  );
}
function TeacherAttendance({ setSync }) {
  const { AttendanceRow, Button, SyncIndicator, Switch, ProgressBar, Toast } = window.RedaONotaMilDesignSystem_cfb76c;
  const names = ['Ana Beatriz Lima', 'Bruno Carvalho', 'João Pedro Alves', 'Lucas Mendes', 'Marina Souza', 'Rafael Costa'];
  const [st, setSt] = React.useState({});
  const [offline, setOffline] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const filled = names.filter((n) => st[n] && st[n] !== 'pending').length;
  React.useEffect(() => { setSync(offline ? (filled ? 'pending' : 'offline') : 'synced'); }, [offline, filled]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 }}>
      <PageHead title="Chamada · Turma Noite A" subtitle="Quarta, 12/11 · 19h30" actions={<Button variant="secondary" iconLeft="check-check" onClick={() => setSt(Object.fromEntries(names.map((n) => [n, 'present'])))}>Todos presentes</Button>} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <ProgressBar label="Preenchida" value={filled} max={names.length} valueLabel={filled + ' de ' + names.length} style={{ flex: 1, minWidth: 200 }} />
        <Switch label="Simular sem conexão" checked={offline} onChange={setOffline} />
      </div>
      {offline && <div style={{ borderRadius: 12, overflow: 'hidden' }}><SyncIndicator variant="banner" status={filled ? 'pending' : 'offline'} pendingCount={filled || undefined} /></div>}
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 12, overflow: 'hidden', background: 'var(--surface-card)' }}>
        {names.map((n, i) => <AttendanceRow key={n} name={n} status={st[n] || 'pending'} onChange={(v) => setSt({ ...st, [n]: v })} divider={i < names.length - 1} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button disabled={filled < names.length} iconLeft="save" onClick={() => setDone(true)}>Salvar chamada</Button></div>
      {done && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }}><Toast tone="success" message={offline ? 'Chamada salva no aparelho. Enviaremos ao reconectar.' : 'Chamada salva.'} onClose={() => setDone(false)} /></div>}
    </div>
  );
}
function TeacherCorrections() {
  const { EssayFeedback, TextArea, Button, Select, Alert } = window.RedaONotaMilDesignSystem_cfb76c;
  const [sent, setSent] = React.useState(false);
  const comps = [{ id: 'C1', label: 'Norma padrão da língua escrita', score: 160 }, { id: 'C2', label: 'Compreensão da proposta', score: 160 }, { id: 'C3', label: 'Seleção e organização de argumentos', score: 120, comment: 'Os argumentos são pertinentes, mas o segundo parágrafo precisa de um exemplo concreto.' }, { id: 'C4', label: 'Mecanismos de coesão', score: 160 }, { id: 'C5', label: 'Proposta de intervenção', score: 80, comment: 'Detalhe o agente e o meio de execução.' }];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHead title="Correção · Ana Beatriz Lima" subtitle="Semana 3 · enviada em 03/11" />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(320px,420px)', gap: 24, alignItems: 'start' }}>
        <div style={{ minHeight: 480, borderRadius: 12, border: '1px dashed var(--border-strong)', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14 }}>Imagem da redação enviada pelo aluno</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <EssayFeedback theme="Tema de exemplo: o papel da leitura na formação do jovem" competencies={comps} expandedId="C5" />
          <Select size="md" label="Ajustar C5" options={['0', '40', '80', '120', '160', '200']} defaultValue="80" />
          <TextArea label="Comentário geral" maxLength={500} defaultValue="Boa evolução em relação à semana 2." />
          {sent ? <Alert tone="success" title="Devolutiva enviada">O aluno foi notificado no app.</Alert> : <Button fullWidth iconLeft="send" onClick={() => setSent(true)}>Enviar devolutiva</Button>}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { AdminDashboard, AdminStudents, AdminFinance, AdminEnroll, TeacherToday, TeacherAttendance, TeacherCorrections });
