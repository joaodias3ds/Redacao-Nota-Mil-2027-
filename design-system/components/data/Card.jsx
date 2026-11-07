import React, { useState } from 'react';
export function Card({ title, subtitle, eyebrow, actions, footer, children, padding = 'md', interactive = false, selected = false, onClick, as = 'div', style }) {
  const [h, setH] = useState(false);
  const pad = { none: 0, sm: 12, md: 16, lg: 24 }[padding] ?? 16;
  const Tag = interactive ? 'button' : as;
  return (
    <Tag type={interactive ? 'button' : undefined} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', width: '100%', font: 'inherit', color: 'inherit', padding: pad, borderRadius: 'var(--radius-card)',
        background: selected ? 'var(--selected-bg)' : 'var(--surface-card)', border: '1px solid ' + (selected ? 'var(--border-brand)' : interactive && h ? 'var(--border-strong)' : 'var(--border-default)'),
        boxShadow: interactive && h ? 'var(--shadow-sm)' : 'none', cursor: interactive ? 'pointer' : undefined, transition: 'box-shadow var(--duration-base), border-color var(--duration-base)', boxSizing: 'border-box', fontFamily: 'var(--font-body)', ...style }}>
      {(title || actions || eyebrow) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            {eyebrow && <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text-brand)' }}>{eyebrow}</span>}
            {title && <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.35, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>}
            {subtitle && <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-secondary)' }}>{subtitle}</span>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>{actions}</div>}
        </div>
      )}
      {children}
      {footer && <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>}
    </Tag>
  );
}
