import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { StatusBadge } from '../feedback/StatusBadge.jsx';
const TYPE = { pdf: ['file-text', 'PDF'], video: ['circle-play', 'Vídeo'], link: ['link', 'Link'], activity: ['clipboard-pen-line', 'Atividade'], essay: ['pen-line', 'Redação'], slides: ['presentation', 'Slides'] };
const ST = { pending: ['warning', 'Pendente'], done: ['success', 'Entregue'], late: ['danger', 'Atrasada'], new: ['brand', 'Novo'], corrected: ['info', 'Corrigida'] };
export function MaterialItem({ type = 'pdf', title, meta, due, status, offline, onClick, divider = true, style }) {
  const [h, setH] = useState(false);
  const [ic, tl] = TYPE[type] || TYPE.pdf;
  const st = status && ST[status];
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 68, padding: '12px 16px', border: 0, borderBottom: divider ? '1px solid var(--border-subtle)' : 0, background: h ? 'var(--hover-overlay)' : 'transparent', font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...style }}>
      <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: type === 'activity' || type === 'essay' ? 'var(--bg-brand-soft)' : 'var(--bg-subtle)', color: type === 'activity' || type === 'essay' ? 'var(--text-brand)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={ic} size={20} /></span>
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.35, textWrap: 'pretty' }}>{title}</span>
        <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-secondary)' }}>
          <span>{tl}{meta ? ' · ' + meta : ''}</span>
          {due && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: status === 'late' ? 'var(--danger-fg)' : 'var(--text-secondary)' }}><Icon name="calendar-clock" size={13} />{due}</span>}
          {offline && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="download" size={13} />Disponível offline</span>}
        </span>
      </span>
      {st && <StatusBadge tone={st[0]} label={st[1]} size="sm" />}
      <Icon name="chevron-right" size={18} color="var(--text-muted)" />
    </button>
  );
}
