import * as React from 'react';
/**
 * Indicador circular de carregamento para botões e áreas pequenas.
 */
export interface SpinnerProps {
  size?: number;
  color?: string;
  label?: string;
  style?: React.CSSProperties;
}
export declare function Spinner(props: SpinnerProps): JSX.Element;
