import * as React from 'react';
/**
 * Campo de texto longo com contador opcional.
 */
export interface TextAreaProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  helper?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  optional?: boolean;
  state?: 'default' | 'focus';
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}
export declare function TextArea(props: TextAreaProps): JSX.Element;
