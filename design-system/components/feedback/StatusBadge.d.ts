import * as React from 'react';
/**
 * Etiqueta de status arredondada; cor sempre acompanhada de ícone e texto.
 */
export interface StatusBadgeProps {
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';
  label: string;
  icon?: string | null;
  showIcon?: boolean;
  dot?: boolean;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;
