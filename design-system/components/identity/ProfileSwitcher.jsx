import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Avatar } from './Avatar.jsx';
const ROLE = { admin: 'Administração', teacher: 'Professor(a)', student: 'Aluno(a)', guardian: 'Responsável' };
export function ProfileSwitcher({ user, profiles = [], value, onChange, open: openProp, compact = false, style }) {
  const [open, setOpen] = useState(false);
  const isOpen = openProp ?? open;
  const cur = profiles.find((p) => p.id === value) || profiles[0] || {};
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-body)', ...style }}>
      <button type="button" aria-haspopup="listbox" aria-expanded={isOpen} onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', minHeight: 48, padding: compact ? 4 : '6px 10px 6px 6px', border: '1px solid ' + (isOpen ? 'var(--border-strong)' : 'transparent'), borderRadius: 'var(--radius-md)', background: isOpen ? 'var(--bg-subtle)' : 'transparent', cursor: 'pointer', textAlign: 'left', font: 'inherit', color: 'inherit' }}>
        <Avatar name={user && user.name} size="md" />
        {!compact && <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user && user.name}</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{cur.label || ROLE[cur.role]}</span>
        </span>}
        {!compact && <Icon name="chevrons-up-down" size={16} color="var(--text-muted)" />}
      </button>
      {isOpen && (
        <div role="listbox" aria-label="Trocar perfil" style={{ position: openProp ? 'relative' : 'absolute', left: 0, right: 0, bottom: openProp ? undefined : 'calc(100% + 4px)', marginTop: openProp ? 4 : 0, padding: 6, background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-md)', zIndex: 'var(--z-dropdown)', minWidth: 220 }}>
          <div style={{ padding: '6px 10px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Entrar como</div>
          {profiles.map((p) => {
            const on = p.id === cur.id;
            return (
              <button key={p.id} role="option" aria-selected={on} type="button" onClick={() => { setOpen(false); onChange && onChange(p.id); }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 44, padding: '0 10px', border: 0, borderRadius: 'var(--radius-sm)', background: on ? 'var(--selected-bg)' : 'transparent', color: on ? 'var(--selected-fg)' : 'var(--text-primary)', font: 'inherit', fontSize: 14, fontWeight: on ? 600 : 500, cursor: 'pointer', textAlign: 'left' }}>
                <Icon name={p.icon || { admin: 'layout-dashboard', teacher: 'presentation', student: 'graduation-cap', guardian: 'users' }[p.role] || 'user'} size={18} />
                <span style={{ flex: 1 }}>{p.label || ROLE[p.role]}</span>
                {on && <Icon name="check" size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
