import React from 'react';
const toPascal = (n) => String(n || '').replace(/(^|[-_ ])([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const camel = (k) => k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.75, label, style, ...rest }) {
  const L = typeof window !== 'undefined' ? window.lucide : null;
  let node = L && L.icons ? (L.icons[toPascal(name)] || L.icons[name]) : null;
  if (node && node[0] === 'svg') node = node[2];
  const kids = (node || []).map(([tag, attrs], i) => {
    const a = {}; Object.keys(attrs || {}).forEach((k) => { if (k !== 'key') a[camel(k)] = attrs[k]; });
    return React.createElement(tag, { key: i, ...a });
  });
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }} {...rest}>
      {kids}
    </svg>
  );
}
