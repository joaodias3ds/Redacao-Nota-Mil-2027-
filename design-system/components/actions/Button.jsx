import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Spinner } from './Spinner.jsx';
const SIZES = {
  sm: { h: 'var(--control-h-sm)', px: 12, fs: 'var(--text-button-sm-size)', ic: 16, gap: 6 },
  md: { h: 'var(--control-h-md)', px: 16, fs: 'var(--text-button-size)', ic: 18, gap: 8 },
  lg: { h: 'var(--control-h-lg)', px: 24, fs: 'var(--text-button-size)', ic: 20, gap: 8 },
};
const VARIANTS = {
  primary: { bg: 'var(--action-primary)', hv: 'var(--action-primary-hover)', pr: 'var(--action-primary-pressed)', fg: 'var(--action-primary-fg)', bd: 'transparent' },
  secondary: { bg: 'var(--action-secondary)', hv: 'var(--action-secondary-hover)', pr: 'var(--action-secondary-pressed)', fg: 'var(--action-secondary-fg)', bd: 'var(--action-secondary-border)' },
  ghost: { bg: 'transparent', hv: 'var(--action-ghost-hover)', pr: 'var(--action-ghost-pressed)', fg: 'var(--action-ghost-fg)', bd: 'transparent' },
  danger: { bg: 'var(--action-danger)', hv: 'var(--action-danger-hover)', pr: 'var(--action-danger-pressed)', fg: 'var(--action-danger-fg)', bd: 'transparent' },
};
export function Button({ variant = 'primary', size = 'md', loading = false, disabled = false, iconLeft, iconRight, fullWidth = false, type = 'button', state, children, onClick, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const [focus, setFocus] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const isHover = state === 'hover' || hover, isPress = state === 'pressed' || press, isFocus = state === 'focus' || focus;
  const off = disabled || loading;
  let bg = isPress ? v.pr : isHover ? v.hv : v.bg;
  let fg = v.fg, bd = v.bd;
  if (disabled) { bg = variant === 'ghost' ? 'transparent' : 'var(--action-disabled-bg)'; fg = 'var(--action-disabled-fg)'; bd = 'transparent'; }
  return (
    <button type={type} disabled={off} aria-busy={loading || undefined} onClick={off ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      onFocus={(e) => setFocus(e.target.matches(':focus-visible'))} onBlur={() => setFocus(false)}
      style={{ display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined, alignItems: 'center', justifyContent: 'center', gap: s.gap,
        height: s.h, padding: '0 ' + s.px + 'px', borderRadius: 'var(--radius-control)', border: '1px solid ' + bd, background: bg, color: fg,
        fontFamily: 'var(--font-body)', fontSize: s.fs, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap', cursor: off ? 'not-allowed' : 'pointer',
        boxShadow: isFocus ? 'var(--focus-ring)' : 'none', outline: 'none', transform: isPress && !off ? 'scale(0.98)' : 'none',
        transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)', boxSizing: 'border-box', ...style }} {...rest}>
      {loading ? <Spinner size={s.ic - 2} /> : iconLeft ? <Icon name={iconLeft} size={s.ic} /> : null}
      {children != null && <span>{children}</span>}
      {!loading && iconRight ? <Icon name={iconRight} size={s.ic} /> : null}
    </button>
  );
}
