import * as React from 'react';
/**
 * Área de envio de arquivos com arrastar-e-soltar e lista de progresso.
 */
export interface FileUploadProps {
  label?: string;
  hint?: string;
  files?: Array<{ name: string;
  size?: string;
  status?: 'uploading' | 'done' | 'error';
  progress?: number;
  message?: string }>;
  error?: string;
  disabled?: boolean;
  dragging?: boolean;
  multiple?: boolean;
  accept?: string;
  onFiles?: (files: File[]) => void;
  onRemove?: (index: number) => void;
  style?: React.CSSProperties;
}
export declare function FileUpload(props: FileUploadProps): JSX.Element;
