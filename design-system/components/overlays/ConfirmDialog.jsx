import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Button } from '../actions/Button.jsx';
export function ConfirmDialog({ open = true, title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', tone = 'default', loading = false, onConfirm, onCancel, inline = false }) {
  if (!open) return null;
  const danger = tone === 'danger';
  const panel = (
    <div role="alertdialog" aria-modal="true" aria-label={title} style={{ width: '100%', maxWidth: 420, background: 'var(--surface-raised)', borderRadius: 'var(--radius-modal)', boxShadow: 'var(--shadow-lg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}>
      <span style={{ width: 44, height: 44, borderRadius: '50%', background: danger ? 'var(--danger-bg)' : 'var(--bg-brand-soft)', color: danger ? 'var(--danger-solid)' : 'var(--text-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={danger ? 'triangle-alert' : 'circle-help'} size={22} /></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)' }}>{title}</h2>
        {message && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{message}</p>}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
        <Button variant={danger ? 'danger' : 'primary'} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </div>
  );
  if (inline) return panel;
  return <div style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-modal)', background: 'var(--surface-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>{panel}</div>;
}
