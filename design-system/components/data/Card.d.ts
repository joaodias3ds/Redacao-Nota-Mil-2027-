import * as React from 'react';
/**
 * Superfície de conteúdo com título, subtítulo, ações e rodapé; raio 12 e borda discreta.
 */
export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  as?: string;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
