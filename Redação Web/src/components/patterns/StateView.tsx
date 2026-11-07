import React from 'react';

export interface StateViewProps {
  kind: 'empty' | 'loading' | 'error' | 'success' | 'offline';
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const StateView: React.FC<StateViewProps> = ({
  title,
  message,
  icon,
  action,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        gap: '12px',
      }}
    >
      {icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-brand-soft, #FFF0F8)',
            color: 'var(--text-brand, #D1007B)',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '8px',
          }}
        >
          {icon}
        </div>
      )}
      <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{title}</h3>
      <p style={{ maxWidth: '400px', fontSize: '0.875rem' }}>{message}</p>
      {action && <div style={{ marginTop: '16px' }}>{action}</div>}
    </div>
  );
};

