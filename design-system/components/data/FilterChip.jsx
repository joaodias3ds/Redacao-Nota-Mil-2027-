import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
export function FilterChip({ label, selected = false, count, icon, removable = false, disabled = false, onClick, onRemove, style }) {
  const [h, setH] = useState(false);
  return (
    <button type="button" aria-pressed={selected} disabled={disabled} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap',
        border: '1px solid ' + (selected ? 'var(--border-brand)' : 'var(--border-default)'), background: selected ? 'var(--selected-bg)' : h ? 'var(--bg-subtle)' : 'var(--surface-card)', color: selected ? 'var(--selected-fg)' : 'var(--text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, boxSizing: 'border-box', ...style }}>
      {selected && !icon && <Icon name="check" size={16} />}
      {icon && <Icon name={icon} size={16} />}
      <span>{label}</span>
      {count != null && <span style={{ fontVariantNumeric: 'tabular-nums', color: selected ? 'var(--selected-fg)' : 'var(--text-muted)' }}>{count}</span>}
      {removable && <span role="button" aria-label={'Remover filtro ' + label} onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }} style={{ display: 'inline-flex', marginRight: -4 }}><Icon name="x" size={16} /></span>}
    </button>
  );
}
