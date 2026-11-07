import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
function Item({ it, on, onClick, collapsed }) {
  const [h, setH] = useState(false);
  return (
    <button type="button" aria-current={on ? 'page' : undefined} title={collapsed ? it.label : undefined} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, width: '100%', height: 40, padding: collapsed ? 0 : '0 12px', justifyContent: collapsed ? 'center' : 'flex-start', border: 0, borderRadius: 'var(--radius-md)',
        background: on ? 'var(--selected-bg)' : h ? 'var(--hover-overlay)' : 'transparent', color: on ? 'var(--selected-fg)' : 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: on ? 600 : 500, cursor: 'pointer', textAlign: 'left' }}>
      {on && <span style={{ position: 'absolute', left: -12, top: 8, bottom: 8, width: 3, borderRadius: 2, background: 'var(--selected-indicator)' }} />}
      {it.icon && <Icon name={it.icon} size={20} />}
      {!collapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</span>}
      {!collapsed && it.badge != null && <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: 'var(--brand)', color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: '20px', textAlign: 'center', boxSizing: 'border-box' }}>{it.badge}</span>}
    </button>
  );
}
export function SideNav({ items = [], value, onChange, header, footer, collapsed = false, style }) {
  return (
    <nav aria-label="Navegação principal" style={{ display: 'flex', flexDirection: 'column', width: collapsed ? 72 : 'var(--sidebar-w)', height: '100%', background: 'var(--surface-card)', borderRight: '1px solid var(--border-default)', boxSizing: 'border-box', flexShrink: 0, ...style }}>
      {header && <div style={{ padding: '16px 16px 8px' }}>{header}</div>}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it, i) => it.section ? (
          collapsed ? <div key={i} style={{ height: 1, background: 'var(--border-subtle)', margin: '12px 8px' }} /> :
          <div key={i} style={{ padding: '16px 12px 6px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>{it.section}</div>
        ) : <Item key={it.id} it={it} on={it.id === value} collapsed={collapsed} onClick={() => onChange && onChange(it.id)} />)}
      </div>
      {footer && <div style={{ padding: 12, borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>}
    </nav>
  );
}
