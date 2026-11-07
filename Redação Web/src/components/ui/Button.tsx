import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  style,
  className = '',
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'background-color 120ms ease, transform 120ms ease',
    width: fullWidth ? '100%' : 'auto',
    border: '1px solid transparent',
    ...style,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { minHeight: '44px', padding: '0 12px', fontSize: '14px' },
    md: { minHeight: '44px', padding: '0 16px', fontSize: '15px' },
    lg: { minHeight: '48px', padding: '0 24px', fontSize: '16px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--action-primary, #D1007B)',
      color: '#ffffff',
      borderColor: 'var(--action-primary, #D1007B)',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: 'var(--action-secondary-fg, #211F20)',
      borderColor: 'var(--action-secondary-border, #C4C5C8)',
    },
    danger: {
      backgroundColor: 'var(--action-danger, #C2261E)',
      color: '#ffffff',
      borderColor: 'var(--action-danger, #C2261E)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--action-ghost-fg, #B8006A)',
      borderColor: 'transparent',
    },
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      className={`rnm-btn ${className}`}
    >
      {loading ? (
        <span
          style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'rnm-spin 0.6s linear infinite',
          }}
        />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
};

