import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Spinner } from '../actions/Spinner.jsx';
const S = {
  synced: ['circle-check', 'var(--success-bg)', 'var(--success-fg)', 'Tudo sincronizado'],
  syncing: [null, 'var(--info-bg)', 'var(--info-fg)', 'Sincronizando…'],
  pending: ['refresh-cw', 'var(--warning-bg)', 'var(--warning-fg)', 'Alterações aguardando envio'],
  offline: ['wifi-off', 'var(--warning-bg)', 'var(--warning-fg)', 'Sem conexão'],
  error: ['cloud-alert', 'var(--danger-bg)', 'var(--danger-fg)', 'Falha ao sincronizar'],
};
export function SyncIndicator({ status = 'synced', pendingCount, lastSync, variant = 'pill', onRetry, style }) {
  const [ic, bg, fg, label] = S[status] || S.synced;
  const extra = pendingCount ? ' · ' + pendingCount + (pendingCount === 1 ? ' alteração' : ' alterações') + ' na fila' : '';
  if (variant === 'banner') return (
    <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: bg, color: fg, fontFamily: 'var(--font-body)', fontSize: 14, ...style }}>
      {ic ? <Icon name={ic} size={18} /> : <Spinner size={16} />}
      <span style={{ flex: 1, minWidth: 0 }}><strong style={{ fontWeight: 600 }}>{label}</strong><span style={{ color: 'var(--text-primary)' }}>{extra}{status === 'offline' && !extra ? ' · você pode continuar; enviaremos ao reconectar' : ''}{lastSync && status === 'synced' ? ' · ' + lastSync : ''}</span></span>
      {onRetry && (status === 'error' || status === 'pending') && <button type="button" onClick={onRetry} style={{ border: 0, background: 'transparent', color: fg, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '6px 4px', textDecoration: 'underline', textUnderlineOffset: 2 }}>Tentar agora</button>}
    </div>
  );
  return (
    <span role="status" aria-live="polite" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 999, background: bg, color: fg, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', ...style }}>
      {ic ? <Icon name={ic} size={14} strokeWidth={2.2} /> : <Spinner size={12} />}{label}{pendingCount ? ' (' + pendingCount + ')' : ''}
    </span>
  );
}
