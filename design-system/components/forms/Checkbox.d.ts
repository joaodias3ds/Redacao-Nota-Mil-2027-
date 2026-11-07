import * as React from 'react';
/**
 * Caixa de seleção com rótulo e descrição; área de toque mínima de 48px.
 */
export interface CheckboxProps {
  label?: string;
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
