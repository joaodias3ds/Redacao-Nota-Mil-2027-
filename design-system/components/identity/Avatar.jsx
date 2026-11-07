import React from 'react';
const SIZES = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
export function initials(name = '') { const p = String(name).trim().split(/\s+/); return ((p[0] || '')[0] || '').toUpperCase() + (p.length > 1 ? (p[p.length - 1][0] || '').toUpperCase() : ''); }
export function Avatar({ name, src, size = 'md', status, ring = false, style }) {
  const d = typeof size === 'number' ? size : SIZES[size] || 40;
  return (
    <span role="img" aria-label={name} style={{ position: 'relative', display: 'inline-flex', width: d, height: d, flexShrink: 0, ...style }}>
      <span style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-brand-soft)', color: 'var(--selected-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: Math.round(d * 0.38), boxShadow: ring ? '0 0 0 2px var(--surface-card), 0 0 0 4px var(--selected-indicator)' : 'none' }}>
        {src ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials(name)}
      </span>
      {status && <span aria-hidden="true" style={{ position: 'absolute', right: 0, bottom: 0, width: Math.max(8, d * 0.25), height: Math.max(8, d * 0.25), borderRadius: '50%', background: status === 'online' ? 'var(--success-solid)' : status === 'busy' ? 'var(--danger-solid)' : 'var(--neutral-solid)', boxShadow: '0 0 0 2px var(--surface-card)' }} />}
    </span>
  );
}
