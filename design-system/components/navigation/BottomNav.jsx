import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function BottomNav({ items = [], value, onChange, safeAreaBottom = 0, style }) {
  return (
    <nav aria-label="Navegação" style={{ display: 'flex', background: 'var(--surface-card)', borderTop: '1px solid var(--border-default)', paddingBottom: safeAreaBottom, boxSizing: 'border-box', ...style }}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button key={it.id} type="button" aria-current={on ? 'page' : undefined} onClick={() => onChange && onChange(it.id)}
            style={{ flex: 1, minWidth: 0, height: 'var(--bottomnav-h)', border: 0, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer',
              color: on ? 'var(--selected-fg)' : 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: on ? 600 : 500 }}>
            <span style={{ position: 'relative', width: 56, height: 28, borderRadius: 999, background: on ? 'var(--selected-bg)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={it.icon} size={22} strokeWidth={on ? 2.1 : 1.75} />
              {it.badge != null && <span style={{ position: 'absolute', top: -2, right: 10, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: 'var(--brand)', color: '#fff', fontSize: 10, fontWeight: 700, lineHeight: '16px', boxSizing: 'border-box', boxShadow: '0 0 0 2px var(--surface-card)' }}>{it.badge}</span>}
            </span>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
