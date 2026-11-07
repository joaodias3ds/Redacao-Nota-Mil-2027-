import * as React from 'react';
/**
 * Cabeçalho da web (64px) ou do app (56px) com voltar, menu, título e ações.
 */
export interface TopBarProps {
  title?: string;
  subtitle?: string;
  leading?: React.ReactNode;
  onBack?: () => void;
  onMenu?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'web' | 'mobile';
  sticky?: boolean;
  style?: React.CSSProperties;
}
export declare function TopBar(props: TopBarProps): JSX.Element;
