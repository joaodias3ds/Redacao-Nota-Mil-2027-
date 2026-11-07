import * as React from 'react';
/**
 * Opção exclusiva dentro de um grupo.
 */
export interface RadioProps {
  label?: string;
  description?: string;
  name?: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
