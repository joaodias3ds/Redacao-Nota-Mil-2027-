import * as React from 'react';
/**
 * Devolutiva de redação por competência (C1–C5) com comentários expansíveis.
 */
export interface EssayFeedbackProps {
  theme: string;
  submittedAt?: string;
  correctedBy?: string;
  total?: number;
  maxTotal?: number;
  competencies: Array<{ id: string;
  label: string;
  score: number;
  max?: number;
  comment?: string }>;
  expandedId?: string;
  style?: React.CSSProperties;
}
export declare function EssayFeedback(props: EssayFeedbackProps): JSX.Element;
