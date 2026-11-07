import * as React from 'react';
/**
 * Menu de ações contextual aberto por botão de três pontos.
 */
export interface ActionMenuProps {
  items: Array<{ id?: string;
  label?: string;
  icon?: string;
  tone?: 'default' | 'danger';
  disabled?: boolean;
  shortcut?: string;
  divider?: boolean }>;
  onSelect?: (id: string) => void;
  label?: string;
  icon?: string;
  open?: boolean;
  align?: 'left' | 'right';
  inline?: boolean;
  style?: React.CSSProperties;
}
export declare function ActionMenu(props: ActionMenuProps): JSX.Element;
