import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { StatusBadge } from '../feedback/StatusBadge.jsx';
import { Button } from '../actions/Button.jsx';
const ST = { paid: ['success', 'Pago', 'circle-check'], pending: ['warning', 'A vencer', 'clock'], overdue: ['danger', 'Em atraso', 'circle-alert'], processing: ['info', 'Processando', 'loader'], negotiated: ['neutral', 'Acordo ativo', 'handshake'] };
export function PaymentStatus({ reference, student, dueDate, paidAt, amount, status = 'pending', method, onPay, onReceipt, variant = 'card', style }) {
  const [tone, label, icon] = ST[status] || ST.pending;
  const row = variant === 'row';
  return (
    <div style={{ display: 'flex', flexDirection: row ? 'row' : 'column', alignItems: row ? 'center' : 'stretch', gap: row ? 12 : 16, padding: 16, borderRadius: row ? 0 : 'var(--radius-card)', border: row ? 0 : '1px solid ' + (status === 'overdue' ? 'var(--danger-border)' : 'var(--border-default)'), borderBottom: row ? '1px solid var(--border-subtle)' : undefined, background: 'var(--surface-card)', fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: row ? 1 : undefined }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Mensalidade · {reference}</span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{[student, status === 'paid' && paidAt ? 'Pago em ' + paidAt : dueDate && 'Vence em ' + dueDate, method].filter(Boolean).join(' · ')}</span>
        </div>
        {!row && <StatusBadge tone={tone} label={label} icon={icon} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: row ? 16 : 22, fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{amount}</span>
        {row && <StatusBadge tone={tone} label={label} icon={icon} size="sm" />}
        {!row && (status === 'pending' || status === 'overdue') && onPay && <Button size="md" iconLeft="qr-code" onClick={onPay}>Pagar com Pix</Button>}
        {!row && status === 'paid' && onReceipt && <Button size="md" variant="ghost" iconLeft="receipt-text" onClick={onReceipt}>Comprovante</Button>}
      </div>
    </div>
  );
}
