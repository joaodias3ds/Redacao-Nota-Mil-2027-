import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Spinner } from '../actions/Spinner.jsx';
export function SaveIndicator({ state = 'saved', lastSaved }) {
  const m = { saved: ['circle-check', 'var(--success-fg)', 'Salvo' + (lastSaved ? ' às ' + lastSaved : '')], saving: [null, 'var(--text-secondary)', 'Salvando…'], unsaved: ['circle-dot', 'var(--warning-fg)', 'Alterações não salvas'], error: ['cloud-alert', 'var(--danger-fg)', 'Não foi possível salvar'], offline: ['cloud-off', 'var(--warning-fg)', 'Salvo no aparelho · envia ao reconectar'] }[state];
  return (
    <span role="status" aria-live="polite" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: m[1], fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
      {m[0] ? <Icon name={m[0]} size={16} /> : <Spinner size={14} />}{m[2]}
    </span>
  );
}
export function EnrollmentStepper({ steps = [], current = 0, saveState, lastSaved, variant = 'full', onStepClick, style }) {
  if (variant === 'compact') {
    const pct = ((current + 1) / steps.length) * 100;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-body)', ...style }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Etapa {current + 1} de {steps.length}</span>
          {saveState && <SaveIndicator state={saveState} lastSaved={lastSaved} />}
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{steps[current] && steps[current].label}</span>
        <div style={{ height: 4, borderRadius: 2, background: 'var(--border-subtle)' }}><div style={{ width: pct + '%', height: '100%', borderRadius: 2, background: 'var(--action-primary)' }} /></div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--font-body)', ...style }}>
      <ol style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 0 }}>
        {steps.map((s, i) => {
          const done = i < current, on = i === current;
          return (
            <li key={s.id || i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button type="button" disabled={!onStepClick || i > current} onClick={() => onStepClick && onStepClick(i)} aria-current={on ? 'step' : undefined}
                  style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, border: '2px solid ' + (done || on ? 'var(--action-primary)' : 'var(--border-strong)'), background: done ? 'var(--action-primary)' : 'var(--surface-card)', color: done ? '#fff' : on ? 'var(--text-brand)' : 'var(--text-muted)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: onStepClick && i <= current ? 'pointer' : 'default', fontFamily: 'inherit', boxShadow: on ? '0 0 0 4px var(--bg-brand-soft)' : 'none', padding: 0 }}>
                  {done ? <Icon name="check" size={16} strokeWidth={3} /> : i + 1}
                </button>
                {i < steps.length - 1 && <span style={{ flex: 1, height: 2, margin: '0 8px', background: done ? 'var(--action-primary)' : 'var(--border-default)' }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: on ? 600 : 500, color: on ? 'var(--text-primary)' : done ? 'var(--text-secondary)' : 'var(--text-muted)', paddingRight: 8 }}>{s.label}</span>
            </li>
          );
        })}
      </ol>
      {saveState && <SaveIndicator state={saveState} lastSaved={lastSaved} />}
    </div>
  );
}
