import React from 'react';

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  label: string;
  icon?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, icon }) => {
  const styles: Record<string, React.CSSProperties> = {
    success: {
      backgroundColor: 'var(--success-bg, #EAF6EF)',
      color: 'var(--success-fg, #165E3A)',
      borderColor: 'var(--success-border, #A8DCBF)',
    },
    warning: {
      backgroundColor: 'var(--warning-bg, #FFF5E1)',
      color: 'var(--warning-fg, #8A5100)',
      borderColor: 'var(--warning-border, #FFD98A)',
    },
    danger: {
      backgroundColor: 'var(--danger-bg, #FDECEA)',
      color: 'var(--danger-fg, #9E1C15)',
      borderColor: 'var(--danger-border, #F6B7B2)',
    },
    info: {
      backgroundColor: 'var(--info-bg, #EAF2FB)',
      color: 'var(--info-fg, #164E86)',
      borderColor: 'var(--info-border, #B4D2F1)',
    },
    neutral: {
      backgroundColor: 'var(--neutral-bg, #F5F5F7)',
      color: 'var(--neutral-fg, #57585A)',
      borderColor: 'var(--neutral-border, #DCDCDF)',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '0.8125rem',
        fontWeight: 600,
        border: '1px solid',
        ...styles[status],
      }}
    >
      {icon}
      {label}
    </span>
  );
};

