import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
const DIM = { sm: [36, 18], md: [44, 20], lg: [48, 22] };
const V = {
  primary: ['var(--action-primary)', 'var(--action-primary-hover)', 'var(--action-primary-pressed)', 'var(--action-primary-fg)', 'transparent'],
  secondary: ['var(--action-secondary)', 'var(--action-secondary-hover)', 'var(--action-secondary-pressed)', 'var(--action-secondary-fg)', 'var(--action-secondary-border)'],
  ghost: ['transparent', 'var(--hover-overlay)', 'var(--pressed-overlay)', 'var(--text-secondary)', 'transparent'],
  danger: ['transparent', 'var(--danger-bg)', 'var(--danger-bg)', 'var(--danger-fg)', 'transparent'],
};
export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, badge, state, onClick, style, ...rest }) {
  const [h, setH] = useState(false), [p, setP] = useState(false), [f, setF] = useState(false);
  const [bg, hv, pr, fg, bd] = V[variant] || V.ghost;
  const [d, ic] = DIM[size] || DIM.md;
  const isH = state === 'hover' || h, isP = state === 'pressed' || p, isF = state === 'focus' || f;
  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setP(false); }} onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}
      onFocus={(e) => setF(e.target.matches(':focus-visible'))} onBlur={() => setF(false)}
      style={{ position: 'relative', width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-control)',
        border: '1px solid ' + (disabled ? 'transparent' : bd), background: disabled ? (variant === 'ghost' || variant === 'danger' ? 'transparent' : 'var(--action-disabled-bg)') : isP ? pr : isH ? hv : bg,
        color: disabled ? 'var(--action-disabled-fg)' : fg, cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: isF ? 'var(--focus-ring)' : 'none', outline: 'none', padding: 0,
        transition: 'background var(--duration-fast) var(--ease-standard)', flexShrink: 0, boxSizing: 'border-box', ...style }} {...rest}>
      <Icon name={icon} size={ic} />
      {badge != null && badge !== false && (
        <span aria-hidden="true" style={{ position: 'absolute', top: 6, right: 6, minWidth: badge === true ? 8 : 16, height: badge === true ? 8 : 16, padding: badge === true ? 0 : '0 4px', borderRadius: 999, background: 'var(--brand)', color: '#fff', fontSize: 10, fontWeight: 700, lineHeight: '16px', textAlign: 'center', boxShadow: '0 0 0 2px var(--surface-card)', boxSizing: 'border-box', fontFamily: 'var(--font-body)' }}>{badge === true ? '' : badge}</span>
      )}
    </button>
  );
}
