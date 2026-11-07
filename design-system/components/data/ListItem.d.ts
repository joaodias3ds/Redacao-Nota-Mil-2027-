import * as React from 'react';
/**
 * Linha de lista com ícone/avatar, título, subtítulo, meta e chevron; mínimo 64px.
 */
export interface ListItemProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  leading?: React.ReactNode;
  leadingIcon?: string;
  trailing?: React.ReactNode;
  chevron?: boolean;
  selected?: boolean;
  divider?: boolean;
  dense?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ListItem(props: ListItemProps): JSX.Element;
