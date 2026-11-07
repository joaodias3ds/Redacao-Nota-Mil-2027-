import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Spinner } from '../actions/Spinner.jsx';
import { Button } from '../actions/Button.jsx';
const K = {
  empty: ['inbox', 'var(--bg-subtle)', 'var(--text-secondary)'],
  error: ['circle-alert', 'var(--danger-bg)', 'var(--danger-solid)'],
  success: ['circle-check', 'var(--success-bg)', 'var(--success-solid)'],
  offline: ['wifi-off', 'var(--warning-bg)', 'var(--warning-fg)'],
  loading: [null, 'var(--bg-brand-soft)', 'var(--text-brand)'],
};
export function StateView({ kind = 'empty', icon, title, message, actionLabel, onAction, secondaryLabel, onSecondary, compact = false, style }) {
  const [ic, bg, fg] = K[kind] || K.empty;
  return (
    <div role={kind === 'error' ? 'alert' : 'status'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: compact ? 8 : 12, padding: compact ? 16 : '32px 24px', fontFamily: 'var(--font-body)', ...style }}>
      <span style={{ width: compact ? 44 : 56, height: compact ? 44 : 56, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {kind === 'loading' ? <Spinner size={compact ? 20 : 24} /> : <Icon name={icon || ic} size={compact ? 20 : 26} />}
      </span>
      {title && <span style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 16 : 18, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>{title}</span>}
      {message && <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 360 }}>{message}</span>}
      {(actionLabel || secondaryLabel) && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {secondaryLabel && <Button variant="secondary" size="md" onClick={onSecondary}>{secondaryLabel}</Button>}
          {actionLabel && <Button variant={kind === 'error' ? 'secondary' : 'primary'} size="md" iconLeft={kind === 'error' ? 'rotate-cw' : undefined} onClick={onAction}>{actionLabel}</Button>}
        </div>
      )}
    </div>
  );
}
