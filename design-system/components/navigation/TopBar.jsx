import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function TopBar({ title, subtitle, leading, onBack, onMenu, actions, children, variant = 'web', sticky = false, style }) {
  const mobile = variant === 'mobile';
  const iconBtn = { width: 44, height: 44, border: 0, background: 'transparent', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer', flexShrink: 0 };
  return (
    <header style={{ position: sticky ? 'sticky' : 'relative', top: 0, zIndex: sticky ? 'var(--z-sticky)' : undefined, display: 'flex', alignItems: 'center', gap: mobile ? 4 : 16, minHeight: mobile ? 56 : 'var(--topbar-h)', padding: mobile ? '0 8px' : '0 24px',
      background: 'var(--surface-card)', borderBottom: '1px solid var(--border-default)', boxSizing: 'border-box', fontFamily: 'var(--font-body)', ...style }}>
      {onBack && <button type="button" aria-label="Voltar" onClick={onBack} style={iconBtn}><Icon name="arrow-left" size={22} /></button>}
      {onMenu && <button type="button" aria-label="Abrir menu" onClick={onMenu} style={iconBtn}><Icon name="menu" size={22} /></button>}
      {leading}
      {(title || subtitle) && (
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: mobile ? 1 : undefined, paddingLeft: mobile && !onBack && !onMenu ? 8 : 0 }}>
          {title && <span style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 18 : 20, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>}
          {subtitle && <span style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</span>}
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>{children}</div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 0 : 8 }}>{actions}</div>}
    </header>
  );
}
