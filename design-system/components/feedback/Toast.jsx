import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const T = { info: ['info', '#8DC0F2'], success: ['circle-check', '#7FDDA9'], warning: ['triangle-alert', '#FFC966'], danger: ['circle-alert', '#FF8F87'] };
export function Toast({ tone = 'success', title, message, actionLabel, onAction, onClose, style }) {
  const [ic, c] = T[tone] || T.success;
  return (
    <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '12px 12px 12px 16px', maxWidth: 440, borderRadius: 'var(--radius-card)', background: '#211F20', color: '#F2F2F3', boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...style }}>
      <Icon name={ic} size={20} color={c} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {title && <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>}
        {message && <span style={{ fontSize: 14, color: '#B9BABD', lineHeight: 1.4 }}>{message}</span>}
      </div>
      {actionLabel && <button type="button" onClick={onAction} style={{ border: 0, background: 'transparent', color: '#FF85C6', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '8px', whiteSpace: 'nowrap' }}>{actionLabel}</button>}
      {onClose && <button type="button" aria-label="Fechar" onClick={onClose} style={{ border: 0, background: 'transparent', color: '#B9BABD', cursor: 'pointer', padding: 6, display: 'inline-flex' }}><Icon name="x" size={18} /></button>}
    </div>
  );
}
