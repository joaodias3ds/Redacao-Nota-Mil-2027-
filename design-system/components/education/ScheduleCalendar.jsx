import React from 'react';
import { Icon } from '../icons/Icon.jsx';
function Event({ e, compact }) {
  const st = e.status === 'cancelled' ? { bg: 'var(--bg-subtle)', bd: 'var(--border-strong)', fg: 'var(--text-muted)', deco: 'line-through' } : e.status === 'changed' ? { bg: 'var(--warning-bg)', bd: 'var(--warning-solid)', fg: 'var(--text-primary)' } : { bg: 'var(--bg-brand-soft)', bd: 'var(--brand)', fg: 'var(--text-primary)' };
  return (
    <div style={{ padding: compact ? '6px 8px' : '8px 10px', borderRadius: 'var(--radius-sm)', background: st.bg, boxShadow: 'inset 3px 0 0 ' + st.bd, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{e.start}–{e.end}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: st.fg, textDecoration: st.deco, lineHeight: 1.3 }}>{e.title}</span>
      {e.place && !compact && <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{e.place}</span>}
      {e.status === 'changed' && <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--warning-fg)' }}>Horário alterado</span>}
      {e.status === 'cancelled' && <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Cancelada</span>}
    </div>
  );
}
export function ScheduleCalendar({ days = [], mode = 'week', todayId, title, onPrev, onNext, style }) {
  const nav = (onPrev || onNext || title) && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
      {onPrev && <button type="button" aria-label="Semana anterior" onClick={onPrev} style={{ width: 36, height: 36, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', color: 'var(--text-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="chevron-left" size={18} /></button>}
      {onNext && <button type="button" aria-label="Próxima semana" onClick={onNext} style={{ width: 36, height: 36, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', color: 'var(--text-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="chevron-right" size={18} /></button>}
    </div>
  );
  if (mode === 'agenda') return (
    <div style={{ fontFamily: 'var(--font-body)', ...style }}>
      {nav}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {days.map((d) => (
          <div key={d.id} style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 44, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: d.id === todayId ? 'var(--text-brand)' : 'var(--text-secondary)' }}>{d.weekday}</span>
              <span style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, background: d.id === todayId ? 'var(--action-primary)' : 'transparent', color: d.id === todayId ? '#fff' : 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{d.day}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
              {(d.events || []).length === 0 ? <span style={{ fontSize: 13, color: 'var(--text-muted)', paddingTop: 12 }}>Sem aulas</span> : d.events.map((e, i) => <Event key={i} e={e} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ fontFamily: 'var(--font-body)', ...style }}>
      {nav}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + days.length + ', minmax(0,1fr))', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--surface-card)' }}>
        {days.map((d, i) => (
          <div key={d.id} style={{ borderLeft: i ? '1px solid var(--border-subtle)' : 0, display: 'flex', flexDirection: 'column', minHeight: 160 }}>
            <div style={{ padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid var(--border-subtle)', background: d.id === todayId ? 'var(--bg-brand-soft)' : 'var(--bg-subtle)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: d.id === todayId ? 'var(--text-brand)' : 'var(--text-secondary)' }}>{d.weekday}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{d.day}</div>
            </div>
            <div style={{ padding: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>{(d.events || []).map((e, j) => <Event key={j} e={e} compact />)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
