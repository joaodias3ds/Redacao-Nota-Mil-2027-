import * as React from 'react';
/**
 * Estado de tela: vazio, carregando, erro, sucesso ou offline.
 */
export interface StateViewProps {
  kind?: 'empty' | 'loading' | 'error' | 'success' | 'offline';
  icon?: string;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  compact?: boolean;
  style?: React.CSSProperties;
}
export declare function StateView(props: StateViewProps): JSX.Element;
