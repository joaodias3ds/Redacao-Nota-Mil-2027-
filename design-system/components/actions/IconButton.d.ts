import * as React from 'react';
/**
 * Botão somente ícone com rótulo acessível obrigatório e badge opcional.
 */
export interface IconButtonProps {
  icon: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  badge?: number | boolean;
  state?: 'default' | 'hover' | 'focus' | 'pressed';
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
