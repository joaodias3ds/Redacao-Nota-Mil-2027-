import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
const LV = (s, m) => { const r = s / m; return r >= 0.8 ? 'var(--success-solid)' : r >= 0.6 ? 'var(--info-solid)' : r >= 0.4 ? 'var(--warning-solid)' : 'var(--danger-solid)'; };
export function EssayFeedback({ theme, submittedAt, correctedBy, total, maxTotal = 1000, competencies = [], expandedId, style }) {
  const [open, setOpen] = useState(expandedId ?? null);
  const sum = total ?? competencies.reduce((a, c) => a + (c.score || 0), 0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card)', background: 'var(--surface-card)', fontFamily: 'var(--font-body)', overflow: 'hidden', ...style }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Devolutiva da redação</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)' }}>{theme}</span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{[submittedAt && 'Enviada em ' + submittedAt, correctedBy && 'Corrigida por ' + correctedBy].filter(Boolean).join(' · ')}</span>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{sum}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>de {maxTotal}</div>
        </div>
      </div>
      {competencies.map((c, i) => {
        const max = c.max || 200; const on = open === c.id;
        return (
          <div key={c.id} style={{ borderBottom: i < competencies.length - 1 ? '1px solid var(--border-subtle)' : 0 }}>
            <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 56, padding: '10px 16px', border: 0, background: 'transparent', font: 'inherit', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
              <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.id}</span>
              <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.35 }}>{c.label}</span>
                <span style={{ height: 6, borderRadius: 3, background: 'var(--border-subtle)', overflow: 'hidden' }}><span style={{ display: 'block', width: (c.score / max) * 100 + '%', height: '100%', background: LV(c.score, max), borderRadius: 3 }} /></span>
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', minWidth: 56, textAlign: 'right' }}>{c.score}<span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: 13 }}>/{max}</span></span>
              <Icon name={on ? 'chevron-up' : 'chevron-down'} size={18} color="var(--text-muted)" />
            </button>
            {on && c.comment && <div style={{ padding: '0 16px 16px 60px', fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{c.comment}</div>}
          </div>
        );
      })}
    </div>
  );
}
