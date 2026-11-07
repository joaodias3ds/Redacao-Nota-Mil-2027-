import React, { useState, useId } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldMessage } from './FieldMessage.jsx';
export function Select({ label, options = [], value, defaultValue, placeholder, helper, error, disabled = false, required, size = 'lg', state, onChange, id, style, ...rest }) {
  const auto = useId(); const fid = id || 'sl-' + auto;
  const [focus, setFocus] = useState(false);
  const isFocus = state === 'focus' || focus;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, ...style }}>
      {label && <FieldLabel htmlFor={fid} required={required}>{label}</FieldLabel>}
      <div style={{ position: 'relative' }}>
        <select id={fid} value={value} defaultValue={value == null ? (defaultValue ?? (placeholder ? '' : undefined)) : undefined} disabled={disabled} aria-invalid={error ? true : undefined}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={onChange}
          style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', height: size === 'md' ? 'var(--control-h-md)' : 'var(--control-h-lg)', padding: '0 40px 0 12px', borderRadius: 'var(--radius-control)',
            border: '1px solid ' + (error ? 'var(--danger-solid)' : isFocus ? 'var(--border-focus)' : disabled ? 'var(--border-default)' : 'var(--border-input)'), boxShadow: isFocus ? '0 0 0 3px var(--bg-brand-soft)' : 'none', outline: 'none',
            background: disabled ? 'var(--bg-subtle)' : 'var(--surface-card)', color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 16, cursor: disabled ? 'not-allowed' : 'pointer', boxSizing: 'border-box' }} {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => { const opt = typeof o === 'string' ? { value: o, label: o } : o; return <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>; })}
        </select>
        <Icon name="chevron-down" size={18} color="var(--text-secondary)" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
      {(error || helper) && <FieldMessage tone={error ? 'error' : 'help'}>{error || helper}</FieldMessage>}
    </div>
  );
}
