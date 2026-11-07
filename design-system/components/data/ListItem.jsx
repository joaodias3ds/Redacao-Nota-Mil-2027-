import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
export function ListItem({ title, subtitle, meta, leading, leadingIcon, trailing, chevron = false, selected = false, divider = true, dense = false, onClick, style }) {
  const [h, setH] = useState(false);
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: dense ? 48 : 64, padding: dense ? '8px 16px' : '12px 16px', textAlign: 'left', font: 'inherit', color: 'inherit', border: 0,
        borderBottom: divider ? '1px solid var(--border-subtle)' : 0, background: selected ? 'var(--selected-bg)' : onClick && h ? 'var(--hover-overlay)' : 'transparent', cursor: onClick ? 'pointer' : undefined, boxSizing: 'border-box', fontFamily: 'var(--font-body)', ...style }}>
      {leading}
      {leadingIcon && <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={leadingIcon} size={20} /></span>}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.35, color: selected ? 'var(--selected-fg)' : 'var(--text-primary)' }}>{title}</span>
        {subtitle && <span style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{subtitle}</span>}
      </span>
      {meta && <span style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{meta}</span>}
      {trailing}
      {chevron && <Icon name="chevron-right" size={18} color="var(--text-muted)" />}
    </Tag>
  );
}
