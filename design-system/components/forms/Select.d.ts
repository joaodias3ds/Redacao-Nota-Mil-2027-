import * as React from 'react';
/**
 * Seleção nativa estilizada (usa o seletor do sistema no iOS/Android).
 */
export interface SelectProps {
  label?: string;
  options: Array<string | { value: string;
  label: string;
  disabled?: boolean }>;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'md' | 'lg';
  state?: 'default' | 'focus';
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
