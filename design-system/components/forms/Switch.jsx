import React, { useId } from 'react';
export function Switch({ label, description, checked = false, disabled = false, onChange, id, style }) {
  const auto = useId(); const fid = id || 'sw-' + auto;
  return (
    <label htmlFor={fid} style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', minHeight: 'var(--touch-target)', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', opacity: disabled ? 0.55 : 1, ...style }}>
      {(label || description) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--text-primary)' }}>{label}</span>}
          {description && <span style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{description}</span>}
        </span>
      )}
      <span style={{ position: 'relative', width: 44, height: 26, flexShrink: 0 }}>
        <input id={fid} type="checkbox" role="switch" checked={checked} disabled={disabled} aria-checked={checked} onChange={(e) => onChange && onChange(e.target.checked, e)} style={{ position: 'absolute', inset: 0, margin: 0, opacity: 0, cursor: 'inherit' }} />
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: checked ? 'var(--action-primary)' : 'var(--border-input)', transition: 'background var(--duration-base) var(--ease-standard)', pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', top: 3, left: checked ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left var(--duration-base) var(--ease-standard)' }} />
        </span>
      </span>
    </label>
  );
}
