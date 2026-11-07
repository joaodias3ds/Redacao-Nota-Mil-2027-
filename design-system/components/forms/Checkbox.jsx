import React, { useId } from 'react';
import { Icon } from '../icons/Icon.jsx';
export function Checkbox({ label, description, checked = false, indeterminate = false, disabled = false, error = false, onChange, id, style }) {
  const auto = useId(); const fid = id || 'cb-' + auto;
  const on = checked || indeterminate;
  return (
    <label htmlFor={fid} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', minHeight: 'var(--touch-target)', padding: '12px 0', boxSizing: 'border-box', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', opacity: disabled ? 0.55 : 1, ...style }}>
      <span style={{ position: 'relative', width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
        <input id={fid} type="checkbox" checked={checked} disabled={disabled} aria-invalid={error || undefined} onChange={(e) => onChange && onChange(e.target.checked, e)}
          ref={(el) => { if (el) el.indeterminate = indeterminate; }}
          style={{ position: 'absolute', inset: 0, margin: 0, opacity: 0, cursor: 'inherit' }} />
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-xs)', border: '2px solid ' + (error ? 'var(--danger-solid)' : on ? 'var(--action-primary)' : 'var(--border-input)'), background: on ? 'var(--action-primary)' : 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxSizing: 'border-box', pointerEvents: 'none', transition: 'background var(--duration-fast)' }}>
          {checked && !indeterminate && <Icon name="check" size={14} strokeWidth={3} />}
          {indeterminate && <Icon name="minus" size={14} strokeWidth={3} />}
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
