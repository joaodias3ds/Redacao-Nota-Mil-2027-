import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Avatar } from '../identity/Avatar.jsx';
import { Button } from '../actions/Button.jsx';
export function AnnouncementCard({ author, role, audience, date, title, body, read = false, requiresConfirmation = false, confirmed = false, confirmations, onConfirm, attachment, style }) {
  return (
    <article style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={author} size="sm" />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{author}{role ? <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}> · {role}</span> : null}</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{[audience, date].filter(Boolean).join(' · ')}</span>
        </div>
        {!read && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--selected-fg)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />Novo</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{body}</p>
      </div>
      {attachment && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', fontSize: 13, color: 'var(--text-primary)' }}><Icon name="paperclip" size={14} />{attachment}</span>}
      {(requiresConfirmation || confirmations) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          {confirmations ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}><Icon name="check-check" size={16} />{confirmations.done} de {confirmations.total} confirmaram a leitura</span>
          ) : <span />}
          {requiresConfirmation && (confirmed
            ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--success-fg)' }}><Icon name="circle-check" size={18} />Leitura confirmada</span>
            : <Button size="md" variant="secondary" iconLeft="check" onClick={onConfirm}>Confirmar leitura</Button>)}
        </div>
      )}
    </article>
  );
}
