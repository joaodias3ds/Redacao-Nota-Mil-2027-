function WebLogin({ onLogin }) {
  const { Button, TextField, Radio } = window.RedaONotaMilDesignSystem_cfb76c;
  const [role, setRole] = React.useState('admin');
  const [loading, setLoading] = React.useState(false);
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', background: 'var(--bg-page)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <img src="../../assets/logo-redacao-1000.png" alt="Redação Nota Mil" style={{ width: 160, marginBottom: 16 }} />
          <h1 style={{ fontSize: 24 }}>Sistema de gestão</h1>
          <TextField label="E-mail" type="email" defaultValue="coordenacao@exemplo.com" />
          <TextField label="Senha" type="password" defaultValue="exemplo123" />
          <div role="radiogroup" aria-label="Entrar como" style={{ display: 'flex', gap: 16 }}><Radio name="r" value="admin" label="Administração" checked={role === 'admin'} onChange={setRole} /><Radio name="r" value="teacher" label="Professor(a)" checked={role === 'teacher'} onChange={setRole} /></div>
          <Button size="lg" fullWidth loading={loading} onClick={() => { setLoading(true); setTimeout(() => onLogin(role), 600); }}>Entrar</Button>
        </div>
      </div>
      <div style={{ background: 'var(--bg-subtle)', borderLeft: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14, padding: 32, textAlign: 'center' }}>Espaço para foto institucional</div>
    </div>
  );
}
const WEB_NAV = {
  admin: [{ id: 'painel', label: 'Painel', icon: 'layout-dashboard' }, { section: 'Acadêmico' }, { id: 'alunos', label: 'Alunos', icon: 'users' }, { id: 'matricula', label: 'Nova matrícula', icon: 'user-plus' }, { id: 'turmas', label: 'Turmas', icon: 'book-open-text' }, { section: 'Financeiro' }, { id: 'financeiro', label: 'Mensalidades', icon: 'wallet', badge: 3 }, { section: 'Comunicação' }, { id: 'avisos', label: 'Avisos', icon: 'megaphone' }],
  teacher: [{ id: 'hoje', label: 'Hoje', icon: 'house' }, { id: 'chamada', label: 'Chamada', icon: 'clipboard-check' }, { id: 'correcoes', label: 'Correções', icon: 'pen-line', badge: 3 }, { id: 'materiais', label: 'Materiais', icon: 'folder-open' }, { id: 'avisos', label: 'Avisos', icon: 'megaphone' }],
};
function WebApp() {
  const { SideNav, TopBar, IconButton, ProfileSwitcher, TextField, SyncIndicator, StateView } = window.RedaONotaMilDesignSystem_cfb76c;
  const [role, setRole] = React.useState(() => localStorage.getItem('rnm-web-role'));
  const [page, setPage] = React.useState(() => localStorage.getItem('rnm-web-page') || 'painel');
  const [sync, setSync] = React.useState('synced');
  const [dark, setDark] = React.useState(false);
  const go = (p) => { setPage(p); localStorage.setItem('rnm-web-page', p); };
  const login = (r) => { setRole(r); localStorage.setItem('rnm-web-role', r); go(r === 'admin' ? 'painel' : 'hoje'); };
  if (!role) return <WebLogin onLogin={login} />;
  const S = { painel: AdminDashboard, alunos: AdminStudents, financeiro: AdminFinance, matricula: AdminEnroll, hoje: TeacherToday, chamada: TeacherAttendance, correcoes: TeacherCorrections }[page];
  return (
    <div data-theme={dark ? 'dark' : 'light'} style={{ display: 'flex', height: '100vh', background: 'var(--bg-subtle)', color: 'var(--text-primary)' }}>
      <SideNav items={WEB_NAV[role]} value={page} onChange={go}
        header={<span style={{ display: 'flex', background: '#fff', borderRadius: 8, padding: 6, alignSelf: 'flex-start', width: 'fit-content' }}><img src="../../assets/logo-redacao-1000.png" alt="Redação Nota Mil" style={{ height: 40 }} /></span>}
        footer={<ProfileSwitcher user={{ name: role === 'admin' ? 'Coordenação' : 'Marina Rocha' }} profiles={[{ id: 'admin', role: 'admin' }, { id: 'teacher', role: 'teacher' }]} value={role} onChange={login} />} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar actions={<><SyncIndicator status={sync} /><IconButton icon={dark ? 'sun' : 'moon'} label="Alternar tema" onClick={() => setDark(!dark)} /><IconButton icon="bell" label="Notificações" badge={2} /><IconButton icon="log-out" label="Sair" onClick={() => { localStorage.removeItem('rnm-web-role'); setRole(null); }} /></>}>
          <TextField type="search" size="md" placeholder="Buscar aluno, turma ou responsável" style={{ width: 360, maxWidth: '100%' }} />
        </TopBar>
        <main style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {S ? <S go={go} setSync={setSync} /> : <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 12 }}><StateView kind="empty" icon="construction" title="Tela não incluída no kit" message="Esta seção existe na navegação, mas não foi desenhada neste UI kit." /></div>}
          </div>
        </main>
      </div>
    </div>
  );
}
window.WebApp = WebApp;
