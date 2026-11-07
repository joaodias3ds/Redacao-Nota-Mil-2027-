import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const T = { help: ['var(--text-muted)', null], error: ['var(--danger-fg)', 'circle-alert'], success: ['var(--success-fg)', 'circle-check'], warning: ['var(--warning-fg)', 'triangle-alert'] };
export function FieldMessage({ tone = 'help', id, children, style }) {
  const [c, ic] = T[tone] || T.help;
  return (
    <div id={id} role={tone === 'error' ? 'alert' : undefined} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: c, fontSize: 'var(--text-caption-size)', lineHeight: 'var(--text-caption-lh)', fontFamily: 'var(--font-body)', ...style }}>
      {ic && <Icon name={ic} size={14} style={{ marginTop: 2 }} />}
      <span>{children}</span>
    </div>
  );
}
