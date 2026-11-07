import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
export function DataTable({ columns = [], rows = [], density = 'regular', sortKey, sortDir = 'asc', onSort, onRowClick, selectedId, emptyText = 'Nenhum registro encontrado.', caption, style }) {
  const [hover, setHover] = useState(null);
  const py = density === 'compact' ? 8 : 12;
  return (
    <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card)', background: 'var(--surface-card)', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 14 }}>
        {caption && <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" aria-sort={sortKey === c.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                style={{ textAlign: c.align || (c.numeric ? 'right' : 'left'), padding: '10px 16px', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', borderBottom: '1px solid var(--border-default)', width: c.width }}>
                {c.sortable ? (
                  <button type="button" onClick={() => onSort && onSort(c.key)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, border: 0, background: 'transparent', font: 'inherit', color: sortKey === c.key ? 'var(--text-primary)' : 'inherit', cursor: 'pointer', padding: 0 }}>
                    {c.label}<Icon name={sortKey === c.key ? (sortDir === 'asc' ? 'arrow-up' : 'arrow-down') : 'chevrons-up-down'} size={14} />
                  </button>
                ) : c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={columns.length} style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>{emptyText}</td></tr>}
          {rows.map((r, i) => {
            const id = r.id ?? i; const sel = selectedId === id;
            return (
              <tr key={id} onClick={onRowClick ? () => onRowClick(r) : undefined} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)}
                style={{ background: sel ? 'var(--selected-bg)' : hover === id && onRowClick ? 'var(--hover-overlay)' : 'transparent', cursor: onRowClick ? 'pointer' : undefined }}>
                {columns.map((c) => (
                  <td key={c.key} style={{ padding: py + 'px 16px', textAlign: c.align || (c.numeric ? 'right' : 'left'), color: 'var(--text-primary)', borderBottom: i === rows.length - 1 ? 0 : '1px solid var(--border-subtle)', fontVariantNumeric: c.numeric ? 'tabular-nums' : undefined, whiteSpace: c.nowrap ? 'nowrap' : undefined, verticalAlign: 'middle' }}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
