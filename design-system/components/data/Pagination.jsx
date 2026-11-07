import React from 'react';
import { Icon } from '../icons/Icon.jsx';
function pages(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const s = new Set([1, total, cur, cur - 1, cur + 1]);
  const arr = [...s].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = []; arr.forEach((n, i) => { if (i && n - arr[i - 1] > 1) out.push('…'); out.push(n); }); return out;
}
export function Pagination({ page = 1, totalPages = 1, totalItems, pageSize, compact = false, onChange, style }) {
  const btn = (active, disabled) => ({ minWidth: 36, height: 36, padding: '0 8px', borderRadius: 'var(--radius-md)', border: '1px solid ' + (active ? 'var(--border-brand)' : 'transparent'), background: active ? 'var(--selected-bg)' : 'transparent',
    color: disabled ? 'var(--text-disabled)' : active ? 'var(--selected-fg)' : 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: active ? 600 : 500, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontVariantNumeric: 'tabular-nums' });
  const go = (p) => onChange && p >= 1 && p <= totalPages && onChange(p);
  const from = totalItems ? (page - 1) * pageSize + 1 : 0, to = totalItems ? Math.min(page * pageSize, totalItems) : 0;
  return (
    <nav aria-label="Paginação" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontFamily: 'var(--font-body)', ...style }}>
      {totalItems != null ? <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{from}–{to} de {totalItems}</span> : <span />}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <button type="button" aria-label="Página anterior" disabled={page <= 1} onClick={() => go(page - 1)} style={btn(false, page <= 1)}><Icon name="chevron-left" size={18} /></button>
        {compact ? <span style={{ fontSize: 14, padding: '0 8px', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{page} de {totalPages}</span> :
          pages(page, totalPages).map((p, i) => p === '…' ? <span key={'e' + i} style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span> :
            <button key={p} type="button" aria-current={p === page ? 'page' : undefined} onClick={() => go(p)} style={btn(p === page, false)}>{p}</button>)}
        <button type="button" aria-label="Próxima página" disabled={page >= totalPages} onClick={() => go(page + 1)} style={btn(false, page >= totalPages)}><Icon name="chevron-right" size={18} /></button>
      </div>
    </nav>
  );
}
