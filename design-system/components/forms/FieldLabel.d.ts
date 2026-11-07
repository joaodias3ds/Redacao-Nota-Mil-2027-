import * as React from 'react';
/**
 * Rótulo de campo com indicação de obrigatório/opcional.
 */
export interface FieldLabelProps {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FieldLabel(props: FieldLabelProps): JSX.Element;
