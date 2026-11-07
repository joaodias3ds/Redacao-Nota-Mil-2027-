import * as React from 'react';
/**
 * Janela modal com título, descrição, conteúdo e rodapé; raio 16.
 */
export interface ModalProps {
  open?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg';
  inline?: boolean;
  style?: React.CSSProperties;
}
export declare function Modal(props: ModalProps): JSX.Element;
