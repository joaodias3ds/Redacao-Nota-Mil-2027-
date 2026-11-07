import * as React from 'react';
/**
 * Botão de ação: primário (rosa de ação), secundário, discreto (ghost) e destrutivo.
 * @startingPoint section="Ações" subtitle="Botões primário, secundário, discreto e destrutivo" viewport="700x420"
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  /** Força um estado visual para documentação */ state?: 'default' | 'hover' | 'focus' | 'pressed';
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
