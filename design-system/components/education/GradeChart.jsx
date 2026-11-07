import React from 'react';
export function GradeChart({ data = [], max = 1000, height = 180, goal, goalLabel = 'Meta', valueSuffix = '', style }) {
  const W = 100 / Math.max(1, data.length);
  const y = (v) => height - (v / max) * height;
  const pts = data.map((d, i) => [(i + 0.5) * W, y(d.value)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
  return (
    <div style={{ fontFamily: 'var(--font-body)', ...style }}>
      <div style={{ position: 'relative', height, marginLeft: 36 }}>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <div key={t} style={{ position: 'absolute', left: 0, right: 0, top: height - t * height, borderTop: '1px ' + (t === 0 ? 'solid' : 'dashed') + ' var(--border-subtle)' }}>
            <span style={{ position: 'absolute', left: -36, top: -8, width: 30, textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(max * t)}</span>
          </div>
        ))}
        {goal != null && <div style={{ position: 'absolute', left: 0, right: 0, top: y(goal), borderTop: '1.5px dashed var(--text-secondary)' }} />}
        <svg viewBox={'0 0 100 ' + height} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
          <path d={path} fill="none" stroke="var(--brand)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        {pts.map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: p[0] + '%', top: p[1], transform: 'translate(-50%,-50%)' }}>
            <span style={{ display: 'block', width: 10, height: 10, borderRadius: '50%', background: 'var(--surface-card)', border: '2.5px solid var(--brand)', boxSizing: 'border-box' }} />
            <span style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{data[i].value}{valueSuffix}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginLeft: 36, marginTop: 8 }}>
        {data.map((d, i) => <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>{d.label}</span>)}
      </div>
      {goal != null && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 36, marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}><span style={{ width: 16, borderTop: '1.5px dashed var(--text-secondary)' }} /><span style={{ fontWeight: 600 }}>{goalLabel}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{goal}</span></div>}
      <table style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}><tbody>{data.map((d, i) => <tr key={i}><th>{d.label}</th><td>{d.value}</td></tr>)}</tbody></table>
    </div>
  );
}
