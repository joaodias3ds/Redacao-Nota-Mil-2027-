import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const TONES = {
  success: ['var(--success-bg)', 'var(--success-fg)', 'var(--success-solid)', 'circle-check'],
  warning: ['var(--warning-bg)', 'var(--warning-fg)', 'var(--warning-solid)', 'clock'],
  danger: ['var(--danger-bg)', 'var(--danger-fg)', 'var(--danger-solid)', 'circle-x'],
  info: ['var(--info-bg)', 'var(--info-fg)', 'var(--info-solid)', 'info'],
  neutral: ['var(--neutral-bg)', 'var(--neutral-fg)', 'var(--neutral-solid)', 'circle-dashed'],
  brand: ['var(--bg-brand-soft)', 'var(--selected-fg)', 'var(--brand)', 'sparkles'],
};
export function StatusBadge({ tone = 'neutral', label, icon, showIcon = true, dot = false, size = 'md', style }) {
  const [bg, fg, solid, def] = TONES[tone] || TONES.neutral;
  const sm = size === 'sm';
  const ic = icon === undefined ? def : icon;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: sm ? 4 : 6, height: sm ? 22 : 26, padding: sm ? '0 8px' : '0 10px', borderRadius: 999, background: bg, color: fg, fontFamily: 'var(--font-body)', fontSize: sm ? 12 : 13, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap', boxSizing: 'border-box', ...style }}>
      {dot ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: solid }} /> : showIcon && ic ? <Icon name={ic} size={sm ? 12 : 14} strokeWidth={2.2} /> : null}
      {label}
    </span>
  );
}
