import React from 'react';
import { Avatar } from './Avatar.jsx';
export function StudentSelector({ students = [], value, onChange, label = 'Acompanhando', style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-body)', ...style }}>
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>}
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
        {students.map((s) => {
          const on = s.id === value;
          return (
            <button key={s.id} type="button" role="radio" aria-checked={on} onClick={() => onChange && onChange(s.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '8px 14px 8px 8px', borderRadius: 'var(--radius-card)', border: (on ? 2 : 1) + 'px solid ' + (on ? 'var(--border-brand)' : 'var(--border-default)'), background: on ? 'var(--selected-bg)' : 'var(--surface-card)', cursor: 'pointer', textAlign: 'left', font: 'inherit', flexShrink: 0, boxSizing: 'border-box', margin: on ? 0 : 1 }}>
              <Avatar name={s.name} size="md" />
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: on ? 'var(--selected-fg)' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>{s.name}</span>
                {s.detail && <span style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{s.detail}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
