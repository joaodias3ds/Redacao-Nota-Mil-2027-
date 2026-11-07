import * as React from 'react';
/**
 * Painel lateral (web) ou folha inferior (mobile).
 */
export interface DrawerProps {
  open?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  side?: 'right' | 'bottom';
  width?: number;
  inline?: boolean;
  style?: React.CSSProperties;
}
export declare function Drawer(props: DrawerProps): JSX.Element;
