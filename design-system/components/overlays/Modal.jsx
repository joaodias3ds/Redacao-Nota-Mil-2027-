import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function Modal({ open = true, title, description, children, footer, onClose, size = 'md', inline = false, style }) {
  if (!open) return null;
  const w = { sm: 400, md: 560, lg: 760 }[size] || 560;
  const panel = (
    <div role="dialog" aria-modal="true" aria-label={title} style={{ width: '100%', maxWidth: w, maxHeight: '90vh', display: 'flex', flexDirection: 'column', background: 'var(--surface-raised)', borderRadius: 'var(--radius-modal)', boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-body)', overflow: 'hidden', boxSizing: 'border-box', ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '24px 24px 0' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {title && <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.3, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h2>}
          {description && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{description}</p>}
        </div>
        {onClose && <button type="button" aria-label="Fechar" onClick={onClose} style={{ width: 40, height: 40, margin: '-8px -8px 0 0', border: 0, background: 'transparent', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={20} /></button>}
      </div>
      {children && <div style={{ padding: '16px 24px 0', overflowY: 'auto', color: 'var(--text-primary)', fontSize: 15 }}>{children}</div>}
      {footer && <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap', padding: 24 }}>{footer}</div>}
      {!footer && <div style={{ height: 24 }} />}
    </div>
  );
  if (inline) return panel;
  return <div onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }} style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-modal)', background: 'var(--surface-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>{panel}</div>;
}
