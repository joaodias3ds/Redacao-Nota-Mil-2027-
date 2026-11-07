import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../icons/Icon.jsx';
function MenuItem({ it, onSelect }) {
  const [h, setH] = useState(false);
  const danger = it.tone === 'danger';
  return (
    <button type="button" role="menuitem" disabled={it.disabled} onClick={() => onSelect && onSelect(it.id)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', height: 40, padding: '0 12px', border: 0, borderRadius: 'var(--radius-sm)', background: h && !it.disabled ? (danger ? 'var(--danger-bg)' : 'var(--hover-overlay)') : 'transparent',
        color: it.disabled ? 'var(--text-disabled)' : danger ? 'var(--danger-fg)' : 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 14, cursor: it.disabled ? 'not-allowed' : 'pointer', textAlign: 'left' }}>
      {it.icon && <Icon name={it.icon} size={18} color={it.disabled ? undefined : danger ? 'var(--danger-solid)' : 'var(--text-secondary)'} />}
      <span style={{ flex: 1 }}>{it.label}</span>
      {it.shortcut && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{it.shortcut}</span>}
    </button>
  );
}
export function ActionMenu({ items = [], onSelect, label = 'Mais ações', icon = 'ellipsis-vertical', open: openProp, align = 'right', inline = false, style }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isOpen = openProp ?? open;
  useEffect(() => { const f = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', f); return () => document.removeEventListener('mousedown', f); }, []);
  const menu = (
    <div role="menu" style={{ minWidth: 200, padding: 6, background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: 2, boxSizing: 'border-box',
      position: inline ? 'relative' : 'absolute', top: inline ? undefined : 'calc(100% + 4px)', right: !inline && align === 'right' ? 0 : undefined, left: !inline && align === 'left' ? 0 : undefined, zIndex: 'var(--z-dropdown)', ...style }}>
      {items.map((it, i) => it.divider ? <div key={i} style={{ height: 1, background: 'var(--border-subtle)', margin: '4px 6px' }} /> : <MenuItem key={it.id} it={it} onSelect={(id) => { setOpen(false); onSelect && onSelect(id); }} />)}
    </div>
  );
  if (inline) return menu;
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button type="button" aria-haspopup="menu" aria-expanded={isOpen} aria-label={label} onClick={() => setOpen(!open)}
        style={{ width: 40, height: 40, border: 0, borderRadius: 'var(--radius-md)', background: isOpen ? 'var(--pressed-overlay)' : 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={20} /></button>
      {isOpen && menu}
    </div>
  );
}
