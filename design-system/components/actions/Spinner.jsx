import React from 'react';
export function Spinner({ size = 18, color = 'currentColor', label = 'Carregando', style }) {
  return (
    <span role="status" aria-label={label} style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', border: Math.max(2, Math.round(size / 9)) + 'px solid', borderColor: color, borderRightColor: 'transparent', animation: 'rnm-spin 0.7s linear infinite', flexShrink: 0, boxSizing: 'border-box', ...style }} />
  );
}
