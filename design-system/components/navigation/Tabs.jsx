import React from 'react';
export function Tabs({ items = [], value, onChange, variant = 'underline', fullWidth = false, style }) {
  const seg = variant === 'segmented';
  return (
    <div role="tablist" style={{ display: 'flex', gap: seg ? 4 : 0, padding: seg ? 4 : 0, background: seg ? 'var(--bg-subtle)' : 'transparent', borderRadius: seg ? 'var(--radius-md)' : 0, borderBottom: seg ? 0 : '1px solid var(--border-default)', overflowX: 'auto', ...style }}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button key={it.id} role="tab" type="button" aria-selected={on} disabled={it.disabled} onClick={() => onChange && onChange(it.id)}
            style={{ flex: fullWidth ? 1 : undefined, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: seg ? 36 : 48, padding: '0 16px', border: 0, whiteSpace: 'nowrap',
              borderRadius: seg ? 6 : 0, background: seg && on ? 'var(--surface-card)' : 'transparent', boxShadow: seg && on ? 'var(--shadow-xs)' : (!seg && on ? 'inset 0 -2px 0 var(--selected-indicator)' : 'none'),
              color: on ? (seg ? 'var(--text-primary)' : 'var(--selected-fg)') : 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: on ? 600 : 500, cursor: it.disabled ? 'not-allowed' : 'pointer', opacity: it.disabled ? 0.5 : 1 }}>
            {it.label}
            {it.count != null && <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: on ? 'var(--action-primary)' : 'var(--border-default)', color: on ? '#fff' : 'var(--text-secondary)', fontSize: 12, fontWeight: 600, lineHeight: '20px', boxSizing: 'border-box', fontVariantNumeric: 'tabular-nums' }}>{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
