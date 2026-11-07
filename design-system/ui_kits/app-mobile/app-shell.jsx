function Phone({ children, dark, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div data-theme={dark ? 'dark' : 'light'} style={{ width: 390, height: 844, borderRadius: 48, border: '10px solid #211F20', background: 'var(--bg-page)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(33,31,32,.18)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
        <div style={{ height: 47, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', fontSize: 15, fontWeight: 600, background: 'var(--surface-card)' }}>
          <span>9:41</span><span style={{ width: 120, height: 32, borderRadius: 20, background: '#000', position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)' }} /><span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><AppIcon n="signal" /><AppIcon n="wifi" /><AppIcon n="battery-full" /></span>
        </div>
        {children}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
}
function AppIcon({ n, s = 16 }) { const { Icon } = window.RedaONotaMilDesignSystem_cfb76c; return <Icon name={n} size={s} />; }
function AppScreen({ title, onBack, actions, banner, children, nav }) {
  const { TopBar } = window.RedaONotaMilDesignSystem_cfb76c;
  return (
    <>
      <TopBar variant="mobile" title={title} onBack={onBack} actions={actions} />
      {banner}
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-subtle)' }}><div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>{children}</div></div>
      {nav}
      <div style={{ height: 24, background: 'var(--surface-card)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}><span style={{ width: 134, height: 5, borderRadius: 3, background: 'var(--text-primary)' }} /></div>
    </>
  );
}
function Section({ title, action, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}><h2 style={{ fontSize: 17, flex: 1, minWidth: 0, textWrap: 'pretty' }}>{title}</h2>{action}</div>
      {children}
    </section>
  );
}
const appBox = { border: '1px solid var(--border-default)', borderRadius: 12, overflow: 'hidden', background: 'var(--surface-card)' };
Object.assign(window, { Phone, AppScreen, Section, appBox, AppIcon });
