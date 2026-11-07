import * as React from 'react';
/**
 * Campo de texto com variações texto, senha, busca, data, e-mail e telefone, com ajuda e validação.
 * @startingPoint section="Formulários" subtitle="Campos de texto, senha, busca e data" viewport="700x520"
 */
export interface TextFieldProps {
  label?: string;
  type?: 'text' | 'password' | 'search' | 'date' | 'email' | 'tel' | 'number';
  size?: 'md' | 'lg';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  optional?: boolean;
  iconLeft?: string;
  suffix?: string;
  state?: 'default' | 'hover' | 'focus';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  id?: string;
  inputMode?: string;
  autoComplete?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
