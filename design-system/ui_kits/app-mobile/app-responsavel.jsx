function GuardianApp() {
  const { BottomNav, IconButton, StudentSelector, ProgressBar, PaymentStatus, AnnouncementCard, ClassCard, ListItem, StatusBadge, Tabs, Drawer, Button, Toast, SyncIndicator } = window.RedaONotaMilDesignSystem_cfb76c;
  const [tab, setTab] = React.useState('inicio');
  const [kid, setKid] = React.useState('1');
  const [pix, setPix] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [conf, setConf] = React.useState({});
  const [ft, setFt] = React.useState('abertas');
  const kids = [{ id: '1', name: 'Lucas', detail: 'Redação ENEM · Noite A' }, { id: '2', name: 'Sofia', detail: 'Reforço individual' }];
  const k = kids.find((x) => x.id === kid);
  const nav = <BottomNav value={tab} onChange={setTab} items={[{ id: 'inicio', label: 'Início', icon: 'house' }, { id: 'frequencia', label: 'Frequência', icon: 'clipboard-check' }, { id: 'financeiro', label: 'Financeiro', icon: 'wallet', badge: 1 }, { id: 'avisos', label: 'Avisos', icon: 'megaphone', badge: 1 }]} />;
  const sel = <StudentSelector label="Acompanhando" students={kids} value={kid} onChange={setKid} />;
  const ann = (id, t, b) => <AnnouncementCard key={id} read={!!conf[id]} author="Coordenação" audience={k.detail} date="Hoje" title={t} body={b} requiresConfirmation confirmed={!!conf[id]} onConfirm={() => setConf({ ...conf, [id]: true })} />;
  let body;
  if (tab === 'financeiro') body = <>
    {sel}
    <Tabs fullWidth items={[{ id: 'abertas', label: 'Em aberto', count: 1 }, { id: 'pagas', label: 'Pagas' }]} value={ft} onChange={setFt} />
    {ft === 'abertas' ? <PaymentStatus reference="Novembro" student={k.name} dueDate="10/11" amount="R$ 000,00" status="pending" onPay={() => setPix(true)} /> :
      <div style={appBox}>{['Outubro', 'Setembro', 'Agosto'].map((m, i) => <PaymentStatus key={m} variant="row" reference={m} amount="R$ 000,00" status="paid" paidAt={'0' + (8 + i) + '/' + (10 - i)} />)}</div>}
    <span style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>Valores fictícios de exemplo.</span>
  </>;
  else if (tab === 'frequencia') body = <>
    {sel}
    <div style={{ ...appBox, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}><ProgressBar label="Frequência no mês" value={kid === '1' ? 92 : 100} tone="success" /><span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Mínimo recomendado: 75%</span></div>
    <Section title="Últimas aulas"><div style={appBox}>{[['Qua, 12/11', 'present'], ['Seg, 10/11', 'present'], ['Qua, 05/11', 'justified'], ['Seg, 03/11', 'absent']].map(([d, s], i) => <ListItem key={d} title={d} subtitle="Redação · Noite A" divider={i < 3} trailing={<StatusBadge size="sm" tone={{ present: 'success', absent: 'danger', justified: 'info' }[s]} label={{ present: 'Presente', absent: 'Falta', justified: 'Justificada' }[s]} />} />)}</div></Section>
  </>;
  else if (tab === 'avisos') body = <>{ann('a1', 'Simulado no sábado', 'Início às 8h. Documento com foto e caneta preta.')}{ann('a2', 'Reunião de responsáveis', 'Dia 20/11, às 19h, na unidade.')}</>;
  else body = <>
    {sel}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <button onClick={() => setTab('frequencia')} style={{ ...appBox, padding: 16, textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Frequência</span><span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{kid === '1' ? '92%' : '100%'}</span><StatusBadge size="sm" tone="success" label="Regular" /></button>
      <button onClick={() => setTab('financeiro')} style={{ ...appBox, padding: 16, textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Mensalidade</span><span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600 }}>Nov</span><StatusBadge size="sm" tone="warning" label="Vence 10/11" /></button>
    </div>
    <ClassCard course={k.detail.split(' · ')[0]} className={k.detail.split(' · ')[1] || 'Aulas particulares'} teacher="Marina Rocha" nextLesson={{ weekday: 'QUA', day: 12, title: 'Proposta de intervenção', time: '19h30–21h00', place: 'Sala 2' }} />
    <Section title="Avisos para confirmar">{ann('a1', 'Simulado no sábado', 'Início às 8h. Documento com foto e caneta preta.')}</Section>
  </>;
  return (
    <>
      <AppScreen title={{ inicio: 'Olá, Carla', frequencia: 'Frequência', financeiro: 'Mensalidades', avisos: 'Avisos' }[tab]} nav={nav} actions={<IconButton icon="message-circle" label="Falar com a escola" />}>{body}</AppScreen>
      {pix && <div style={{ position: 'absolute', inset: 0, background: 'var(--surface-overlay)', display: 'flex', alignItems: 'flex-end', zIndex: 10 }}><Drawer inline side="bottom" title="Pagar com Pix" subtitle={'Novembro · ' + k.name} onClose={() => setPix(false)} footer={<Button fullWidth size="lg" iconLeft="copy" onClick={() => { setPix(false); setToast(true); }}>Copiar código Pix</Button>}><div style={{ height: 180, borderRadius: 12, border: '1px dashed var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14 }}>QR Code (exemplo)</div></Drawer></div>}
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 100, zIndex: 11 }}><Toast tone="success" message="Código copiado. Cole no app do seu banco." onClose={() => setToast(false)} /></div>}
    </>
  );
}
window.GuardianApp = GuardianApp;
