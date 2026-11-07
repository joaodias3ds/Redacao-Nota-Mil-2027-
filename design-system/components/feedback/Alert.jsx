import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const T = { info: ['info', 'var(--info-bg)', 'var(--info-border)', 'var(--info-solid)', 'var(--info-fg)'], success: ['circle-check', 'var(--success-bg)', 'var(--success-border)', 'var(--success-solid)', 'var(--success-fg)'], warning: ['triangle-alert', 'var(--warning-bg)', 'var(--warning-border)', 'var(--warning-solid)', 'var(--warning-fg)'], danger: ['circle-alert', 'var(--danger-bg)', 'var(--danger-border)', 'var(--danger-solid)', 'var(--danger-fg)'] };
export function Alert({ tone = 'info', title, children, action, onClose, style }) {
  const [ic, bg, bd, solid, fg] = T[tone] || T.info;
  return (
    <div role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', borderRadius: 'var(--radius-card)', background: bg, border: '1px solid ' + bd, fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...style }}>
      <Icon name={ic} size={20} color={solid} style={{ marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {title && <span style={{ fontSize: 15, fontWeight: 600, color: fg, lineHeight: 1.4 }}>{title}</span>}
        {children && <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>{children}</span>}
        {action && <div style={{ marginTop: 6 }}>{action}</div>}
      </div>
      {onClose && <button type="button" aria-label="Fechar aviso" onClick={onClose} style={{ border: 0, background: 'transparent', color: 'var(--text-secondary)', padding: 4, margin: -4, cursor: 'pointer', display: 'inline-flex' }}><Icon name="x" size={18} /></button>}
    </div>
  );
}
