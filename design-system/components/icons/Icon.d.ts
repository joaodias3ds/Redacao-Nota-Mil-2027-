import * as React from 'react';
/**
 * Ícone Lucide (traço 1.75) renderizado como SVG inline; requer o script do Lucide carregado na página.
 */
export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
