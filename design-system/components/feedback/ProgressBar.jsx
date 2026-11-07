import React from 'react';
export function ProgressBar({ value = 0, max = 100, label, showValue = true, valueLabel, tone = 'brand', size = 'md', style }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color = { brand: 'var(--action-primary)', success: 'var(--success-solid)', warning: 'var(--warning-solid)', danger: 'var(--danger-solid)', neutral: 'var(--text-secondary)' }[tone] || 'var(--action-primary)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
          {label && <span style={{ color: 'var(--text-secondary)' }}>{label}</span>}
          {showValue && <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{valueLabel ?? Math.round(pct) + '%'}</span>}
        </div>
      )}
      <div role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label} style={{ height: size === 'sm' ? 4 : 8, borderRadius: 999, background: 'var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', borderRadius: 999, background: color, transition: 'width var(--duration-slow) var(--ease-standard)' }} />
      </div>
    </div>
  );
}
