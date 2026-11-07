import * as React from 'react';
/**
 * Navegação lateral do sistema web com seções, badge e modo recolhido.
 */
export interface SideNavProps {
  items: Array<{ id?: string;
  label?: string;
  icon?: string;
  badge?: number | string;
  section?: string }>;
  value?: string;
  onChange?: (id: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  style?: React.CSSProperties;
}
export declare function SideNav(props: SideNavProps): JSX.Element;
