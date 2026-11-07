import React, { useState, useId } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldMessage } from './FieldMessage.jsx';
const H = { md: 'var(--control-h-md)', lg: 'var(--control-h-lg)' };
export function TextField({ label, type = 'text', size = 'lg', value, defaultValue, placeholder, helper, error, success, disabled = false, readOnly = false, required, optional, iconLeft, suffix, state, onChange, onClear, onFocus, onBlur, id, inputMode, autoComplete, style, inputStyle, ...rest }) {
  const auto = useId();
  const fid = id || 'tf-' + auto;
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const isFocus = state === 'focus' || focus, isHover = state === 'hover' || hover;
  const lead = iconLeft || (type === 'search' ? 'search' : type === 'date' ? null : null);
  const realType = type === 'password' ? (show ? 'text' : 'password') : type;
  const border = error ? 'var(--danger-solid)' : isFocus ? 'var(--border-focus)' : success ? 'var(--success-solid)' : isHover && !disabled ? 'var(--text-secondary)' : 'var(--border-input)';
  const msgId = helper || error || success ? fid + '-msg' : undefined;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, ...style }}>
      {label && <FieldLabel htmlFor={fid} required={required} optional={optional}>{label}</FieldLabel>}
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, height: H[size] || H.lg, padding: '0 12px', borderRadius: 'var(--radius-control)', background: disabled ? 'var(--bg-subtle)' : 'var(--surface-card)',
          border: '1px solid ' + (disabled ? 'var(--border-default)' : border), boxShadow: isFocus && !error ? '0 0 0 3px var(--bg-brand-soft)' : isFocus && error ? '0 0 0 3px var(--danger-bg)' : 'none',
          transition: 'border-color var(--duration-fast), box-shadow var(--duration-fast)', boxSizing: 'border-box' }}>
        {lead && <Icon name={lead} size={18} color="var(--text-muted)" />}
        <input id={fid} type={realType} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} readOnly={readOnly} required={required}
          inputMode={inputMode} autoComplete={autoComplete} aria-invalid={error ? true : undefined} aria-describedby={msgId}
          onFocus={(e) => { setFocus(true); onFocus && onFocus(e); }} onBlur={(e) => { setFocus(false); onBlur && onBlur(e); }} onChange={onChange}
          style={{ flex: 1, minWidth: 0, height: '100%', border: 0, outline: 'none', background: 'transparent', color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 16, padding: 0, colorScheme: 'light dark', ...inputStyle }} {...rest} />
        {suffix && <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{suffix}</span>}
        {type === 'password' && (
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} style={{ border: 0, background: 'transparent', padding: 4, margin: -4, cursor: 'pointer', color: 'var(--text-secondary)', display: 'inline-flex' }}>
            <Icon name={show ? 'eye-off' : 'eye'} size={18} />
          </button>
        )}
        {type === 'search' && onClear && value ? (
          <button type="button" onClick={onClear} aria-label="Limpar busca" style={{ border: 0, background: 'transparent', padding: 4, margin: -4, cursor: 'pointer', color: 'var(--text-secondary)', display: 'inline-flex' }}><Icon name="x" size={18} /></button>
        ) : null}
        {error && type !== 'password' && <Icon name="circle-alert" size={18} color="var(--danger-solid)" />}
        {success && !error && <Icon name="circle-check" size={18} color="var(--success-solid)" />}
      </div>
      {(error || success || helper) && <FieldMessage id={msgId} tone={error ? 'error' : success ? 'success' : 'help'}>{error || success || helper}</FieldMessage>}
    </div>
  );
}
