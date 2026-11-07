import React from 'react';
export function FieldLabel({ htmlFor, required, optional, children, style }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'flex', gap: 4, alignItems: 'baseline', fontFamily: 'var(--font-body)', fontSize: 'var(--text-label-size)', lineHeight: 'var(--text-label-lh)', fontWeight: 500, color: 'var(--text-primary)', ...style }}>
      {children}
      {required && <span aria-hidden="true" style={{ color: 'var(--danger-fg)' }}>*</span>}
      {optional && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opcional)</span>}
    </label>
  );
}
