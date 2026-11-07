import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldMessage } from './FieldMessage.jsx';
export function FileUpload({ label, hint = 'PDF, JPG ou PNG · até 10 MB', files = [], error, disabled = false, dragging, multiple = false, accept, onFiles, onRemove, style }) {
  const [drag, setDrag] = useState(false);
  const isDrag = dragging ?? drag;
  const pick = (list) => { if (onFiles && list && list.length) onFiles(Array.from(list)); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-body)', ...style }}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files); }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '24px 16px', textAlign: 'center', borderRadius: 'var(--radius-card)',
          border: '1.5px dashed ' + (error ? 'var(--danger-solid)' : isDrag ? 'var(--border-brand)' : 'var(--border-input)'), background: isDrag ? 'var(--bg-brand-soft)' : disabled ? 'var(--bg-subtle)' : 'var(--surface-card)', cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <input type="file" multiple={multiple} accept={accept} disabled={disabled} onChange={(e) => pick(e.target.files)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />
        <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-brand-soft)', color: 'var(--text-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="upload" size={20} /></span>
        <span style={{ fontSize: 15, color: 'var(--text-primary)' }}><span style={{ color: 'var(--text-link)', fontWeight: 600 }}>Escolha um arquivo</span> ou arraste aqui</span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{hint}</span>
      </label>
      {error && <FieldMessage tone="error">{error}</FieldMessage>}
      {files.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid ' + (f.status === 'error' ? 'var(--danger-border)' : 'var(--border-default)'), borderRadius: 'var(--radius-control)', background: 'var(--surface-card)' }}>
          <Icon name={f.status === 'error' ? 'file-x' : 'file-text'} size={20} color={f.status === 'error' ? 'var(--danger-solid)' : 'var(--text-secondary)'} />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14 }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
              <span style={{ color: f.status === 'error' ? 'var(--danger-fg)' : f.status === 'done' ? 'var(--success-fg)' : 'var(--text-muted)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{f.status === 'uploading' ? (f.progress || 0) + '%' : f.status === 'done' ? 'Enviado' : f.status === 'error' ? 'Falhou' : f.size}</span>
            </div>
            {f.status === 'uploading' && <div style={{ height: 4, borderRadius: 2, background: 'var(--border-subtle)' }}><div style={{ width: (f.progress || 0) + '%', height: '100%', borderRadius: 2, background: 'var(--action-primary)' }} /></div>}
            {f.status === 'error' && f.message && <span style={{ fontSize: 12, color: 'var(--danger-fg)' }}>{f.message}</span>}
          </div>
          {onRemove && <button type="button" onClick={() => onRemove(i)} aria-label={'Remover ' + f.name} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', padding: 4, display: 'inline-flex' }}><Icon name="x" size={18} /></button>}
        </div>
      ))}
    </div>
  );
}
