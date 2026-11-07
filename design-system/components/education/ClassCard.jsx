import React, { useState } from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Avatar } from '../identity/Avatar.jsx';
export function ClassCard({ course, className, teacher, nextLesson, studentsCount, tag, onClick, style }) {
  const [h, setH] = useState(false);
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', padding: 16, textAlign: 'left', font: 'inherit', color: 'inherit', borderRadius: 'var(--radius-card)', background: 'var(--surface-card)', border: '1px solid ' + (onClick && h ? 'var(--border-strong)' : 'var(--border-default)'), boxShadow: onClick && h ? 'var(--shadow-sm)' : 'none', cursor: onClick ? 'pointer' : undefined, boxSizing: 'border-box', fontFamily: 'var(--font-body)', ...style }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--bg-brand-soft)', color: 'var(--text-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="book-open-text" size={22} /></span>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{course}</span>{tag}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)', textWrap: 'pretty' }}>{className}</span>
        </div>
      </div>
      {nextLesson && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 44, paddingRight: 12, borderRight: '1px solid var(--border-default)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-brand)' }}>{nextLesson.weekday}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{nextLesson.day}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Próxima aula</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{nextLesson.title}</span>
            <span style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-secondary)' }}>
              <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}><Icon name="clock" size={14} />{nextLesson.time}</span>
              {nextLesson.place && <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}><Icon name={nextLesson.online ? 'video' : 'map-pin'} size={14} />{nextLesson.place}</span>}
            </span>
          </div>
        </div>
      )}
      {(teacher || studentsCount != null) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
          {teacher && <><Avatar name={teacher} size="xs" /><span style={{ flex: 1 }}>Prof. {teacher}</span></>}
          {studentsCount != null && <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}><Icon name="users" size={14} />{studentsCount} alunos</span>}
        </div>
      )}
    </Tag>
  );
}
