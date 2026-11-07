import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  style,
  className = '',
  ...props
}) => {
  const paddings = {
    sm: '16px',
    md: '24px',
    lg: '32px',
  };

  return (
    <div
      {...props}
      style={{
        backgroundColor: 'var(--surface-card, #ffffff)',
        border: '1px solid var(--border-default, #DCDCDF)',
        borderRadius: 'var(--radius-card, 12px)',
        padding: paddings[padding],
        marginBottom: '24px',
        ...style,
      }}
      className={`rnm-card ${className}`}
    >
      {children}
    </div>
  );
};

