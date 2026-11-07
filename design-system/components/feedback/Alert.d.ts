import * as React from 'react';
/**
 * Aviso inline (informação, sucesso, atenção, erro) com ação opcional.
 */
export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): JSX.Element;
