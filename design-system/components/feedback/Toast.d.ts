import * as React from 'react';
/**
 * Notificação breve sobre superfície grafite, com ação opcional.
 */
export interface ToastProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
