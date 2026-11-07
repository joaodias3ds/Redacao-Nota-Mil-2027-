import * as React from 'react';
/**
 * Navegação inferior do app (até 5 destinos) com indicador em pílula.
 */
export interface BottomNavProps {
  items: Array<{ id: string;
  label: string;
  icon: string;
  badge?: number }>;
  value: string;
  onChange?: (id: string) => void;
  safeAreaBottom?: number;
  style?: React.CSSProperties;
}
export declare function BottomNav(props: BottomNavProps): JSX.Element;
