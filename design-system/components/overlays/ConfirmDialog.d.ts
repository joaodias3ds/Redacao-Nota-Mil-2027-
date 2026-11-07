import * as React from 'react';
/**
 * Diálogo de confirmação para ações importantes ou destrutivas.
 */
export interface ConfirmDialogProps {
  open?: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  loading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  inline?: boolean;
}
export declare function ConfirmDialog(props: ConfirmDialogProps): JSX.Element;
