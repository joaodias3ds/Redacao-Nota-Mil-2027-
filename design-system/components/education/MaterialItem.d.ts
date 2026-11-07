import * as React from 'react';
/**
 * Item de material ou atividade: PDF, vídeo, link, atividade, redação.
 */
export interface MaterialItemProps {
  type?: 'pdf' | 'video' | 'link' | 'activity' | 'essay' | 'slides';
  title: string;
  meta?: string;
  due?: string;
  status?: 'pending' | 'done' | 'late' | 'new' | 'corrected';
  offline?: boolean;
  onClick?: () => void;
  divider?: boolean;
  style?: React.CSSProperties;
}
export declare function MaterialItem(props: MaterialItemProps): JSX.Element;
