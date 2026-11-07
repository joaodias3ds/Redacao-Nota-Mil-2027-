import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function Drawer({ open = true, title, subtitle, children, footer, onClose, side = 'right', width = 420, inline = false, style }) {
  if (!open) return null;
  const sheet = side === 'bottom';
  const panel = (
    <aside role="dialog" aria-modal="true" aria-label={title} style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-raised)', boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-body)', boxSizing: 'border-box',
      width: sheet ? '100%' : width, maxWidth: '100%', height: sheet ? 'auto' : '100%', maxHeight: sheet ? '85vh' : undefined, borderRadius: sheet ? 'var(--radius-modal) var(--radius-modal) 0 0' : 'var(--radius-modal) 0 0 var(--radius-modal)', ...style }}>
      {sheet && <span aria-hidden="true" style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border-strong)', margin: '8px auto 0' }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: sheet ? '12px 16px' : '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{subtitle}</div>}
        </div>
        {onClose && <button type="button" aria-label="Fechar" onClick={onClose} style={{ width: 40, height: 40, border: 0, background: 'transparent', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={20} /></button>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: sheet ? 16 : 24 }}>{children}</div>
      {footer && <div style={{ display: 'flex', gap: 8, padding: sheet ? 16 : '16px 24px', borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>}
    </aside>
  );
  if (inline) return panel;
  return <div onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }} style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-drawer)', background: 'var(--surface-overlay)', display: 'flex', justifyContent: sheet ? 'center' : 'flex-end', alignItems: sheet ? 'flex-end' : 'stretch' }}>{panel}</div>;
}
