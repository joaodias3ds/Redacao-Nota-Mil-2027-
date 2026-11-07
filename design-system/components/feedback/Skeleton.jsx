import React from 'react';
export function Skeleton({ width = '100%', height = 16, radius = 6, circle = false, lines, gap = 8, style }) {
  const base = { display: 'block', background: 'linear-gradient(90deg, var(--skeleton-base) 0px, var(--skeleton-shine) 40px, var(--skeleton-base) 80px)', backgroundSize: '200px 100%', backgroundColor: 'var(--skeleton-base)', animation: 'rnm-shimmer 1.4s linear infinite', backgroundRepeat: 'no-repeat' };
  if (lines) return (
    <span aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap, width, ...style }}>
      {Array.from({ length: lines }).map((_, i) => <span key={i} style={{ ...base, height, borderRadius: radius, width: i === lines - 1 && lines > 1 ? '60%' : '100%' }} />)}
    </span>
  );
  return <span aria-hidden="true" style={{ ...base, width: circle ? height : width, height, borderRadius: circle ? '50%' : radius, flexShrink: 0, ...style }} />;
}
