import React, { useId } from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helperText,
  id,
  style,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div style={{ display: 'grid', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-primary, #211F20)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        style={{
          width: '100%',
          minHeight: '44px',
          padding: '10px 12px',
          borderRadius: '8px',
          border: `1px solid ${error ? 'var(--danger-solid, #C2261E)' : 'var(--border-input, #8E8F92)'}`,
          backgroundColor: '#ffffff',
          color: 'var(--text-primary, #211F20)',
          fontSize: '16px', // evita zoom em mobile iOS
          boxSizing: 'border-box',
          ...style,
        }}
      />
      {error ? (
        <span style={{ fontSize: '0.8125rem', color: 'var(--danger-fg, #9E1C15)' }} role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #57585A)' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

