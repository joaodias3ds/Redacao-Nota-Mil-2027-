import * as React from 'react';
/**
 * Mensagem de ajuda, erro, sucesso ou atenção abaixo de um campo — sempre com texto, nunca só cor.
 */
export interface FieldMessageProps {
  tone?: 'help' | 'error' | 'success' | 'warning';
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FieldMessage(props: FieldMessageProps): JSX.Element;
