import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Avatar } from '../identity/Avatar.jsx';
export const ATTENDANCE = {
  present: { label: 'Presente', short: 'P', icon: 'check', bg: 'var(--success-bg)', fg: 'var(--success-fg)', solid: 'var(--success-solid)' },
  absent: { label: 'Falta', short: 'F', icon: 'x', bg: 'var(--danger-bg)', fg: 'var(--danger-fg)', solid: 'var(--danger-solid)' },
  justified: { label: 'Justificada', short: 'J', icon: 'file-check', bg: 'var(--info-bg)', fg: 'var(--info-fg)', solid: 'var(--info-solid)' },
  pending: { label: 'Não preenchida', short: '–', icon: 'circle-dashed', bg: 'var(--neutral-bg)', fg: 'var(--neutral-fg)', solid: 'var(--neutral-solid)' },
};
export function AttendanceRow({ name, detail, status = 'pending', onChange, readOnly = false, divider = true, style }) {
  const opts = ['present', 'absent', 'justified'];
  const cur = ATTENDANCE[status] || ATTENDANCE.pending;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, padding: '8px 16px', borderBottom: divider ? '1px solid var(--border-subtle)' : 0, fontFamily: 'var(--font-body)', flexWrap: 'wrap', boxSizing: 'border-box', ...style }}>
      <Avatar name={name} size="md" />
      <div style={{ flex: '1 1 140px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: cur.fg }}><Icon name={cur.icon} size={12} strokeWidth={2.4} />{cur.label}{detail ? <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> · {detail}</span> : null}</span>
      </div>
      {!readOnly && (
        <div role="radiogroup" aria-label={'Chamada de ' + name} style={{ display: 'flex', gap: 6 }}>
          {opts.map((k) => {
            const o = ATTENDANCE[k]; const on = status === k;
            return (
              <button key={k} type="button" role="radio" aria-checked={on} aria-label={o.label} title={o.label} onClick={() => onChange && onChange(on ? 'pending' : k)}
                style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', border: '1.5px solid ' + (on ? o.solid : 'var(--border-default)'), background: on ? o.bg : 'var(--surface-card)', color: on ? o.fg : 'var(--text-secondary)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, fontFamily: 'inherit', fontSize: 11, fontWeight: 700, padding: 0 }}>
                <Icon name={o.icon} size={18} strokeWidth={on ? 2.4 : 1.75} />
                <span>{o.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
