import React, { useId } from 'react';
export function Radio({ label, description, name, value, checked = false, disabled = false, onChange, id, style }) {
  const auto = useId(); const fid = id || 'rd-' + auto;
  return (
    <label htmlFor={fid} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', minHeight: 'var(--touch-target)', padding: '12px 0', boxSizing: 'border-box', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', opacity: disabled ? 0.55 : 1, ...style }}>
      <span style={{ position: 'relative', width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
        <input id={fid} type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={(e) => onChange && onChange(value, e)} style={{ position: 'absolute', inset: 0, margin: 0, opacity: 0, cursor: 'inherit' }} />
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid ' + (checked ? 'var(--action-primary)' : 'var(--border-input)'), background: 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', pointerEvents: 'none' }}>
          {checked && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--action-primary)' }} />}
        </span>
      </span>
      {(label || description) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--text-primary)' }}>{label}</span>}
          {description && <span style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{description}</span>}
        </span>
      )}
    </label>
  );
}
