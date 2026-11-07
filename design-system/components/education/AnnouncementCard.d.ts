import * as React from 'react';
/**
 * Aviso da turma com marcação de não lido e confirmação de leitura.
 */
export interface AnnouncementCardProps {
  author: string;
  role?: string;
  audience?: string;
  date?: string;
  title: string;
  body: string;
  read?: boolean;
  requiresConfirmation?: boolean;
  confirmed?: boolean;
  confirmations?: { done: number;
  total: number };
  onConfirm?: () => void;
  attachment?: string;
  style?: React.CSSProperties;
}
export declare function AnnouncementCard(props: AnnouncementCardProps): JSX.Element;
