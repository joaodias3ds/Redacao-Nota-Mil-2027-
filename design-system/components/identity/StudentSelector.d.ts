import * as React from 'react';
/**
 * Seletor horizontal de aluno vinculado, para o responsável.
 */
export interface StudentSelectorProps {
  students: Array<{ id: string;
  name: string;
  detail?: string }>;
  value?: string;
  onChange?: (id: string) => void;
  label?: string;
  style?: React.CSSProperties;
}
export declare function StudentSelector(props: StudentSelectorProps): JSX.Element;
