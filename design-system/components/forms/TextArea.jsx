import React, { useState, useId } from 'react';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldMessage } from './FieldMessage.jsx';
export function TextArea({ label, value, defaultValue, placeholder, rows = 4, maxLength, helper, error, disabled = false, required, optional, state, onChange, id, style, ...rest }) {
  const auto = useId(); const fid = id || 'ta-' + auto;
  const [focus, setFocus] = useState(false);
  const [len, setLen] = useState(String(value ?? defaultValue ?? '').length);
  const isFocus = state === 'focus' || focus;
  const count = value != null ? String(value).length : len;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <FieldLabel htmlFor={fid} required={required} optional={optional}>{label}</FieldLabel>}
      <textarea id={fid} rows={rows} value={value} defaultValue={defaultValue} placeholder={placeholder} maxLength={maxLength} disabled={disabled} aria-invalid={error ? true : undefined}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => { setLen(e.target.value.length); onChange && onChange(e); }}
        style={{ resize: 'vertical', padding: 12, borderRadius: 'var(--radius-control)', border: '1px solid ' + (error ? 'var(--danger-solid)' : isFocus ? 'var(--border-focus)' : disabled ? 'var(--border-default)' : 'var(--border-input)'),
          boxShadow: isFocus ? '0 0 0 3px ' + (error ? 'var(--danger-bg)' : 'var(--bg-brand-soft)') : 'none', outline: 'none', background: disabled ? 'var(--bg-subtle)' : 'var(--surface-card)', color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.5, boxSizing: 'border-box', width: '100%' }} {...rest} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        {(error || helper) ? <FieldMessage tone={error ? 'error' : 'help'}>{error || helper}</FieldMessage> : <span />}
        {maxLength ? <span style={{ fontSize: 12, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{count}/{maxLength}</span> : null}
      </div>
    </div>
  );
}
