import * as React from 'react';
/**
 * Cartão de turma: curso, turma, professor e próxima aula.
 * @startingPoint section="Educação" subtitle="Turma, chamada, devolutiva e mensalidade" viewport="700x520"
 */
export interface ClassCardProps {
  course: string;
  className: string;
  teacher?: string;
  nextLesson?: { weekday: string;
  day: string | number;
  title: string;
  time: string;
  place?: string;
  online?: boolean };
  studentsCount?: number;
  tag?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ClassCard(props: ClassCardProps): JSX.Element;
