import * as React from 'react';
/**
 * Gráfico de linha simples para evolução de notas.
 */
export interface GradeChartProps {
  data: Array<{ label: string;
  value: number }>;
  max?: number;
  height?: number;
  goal?: number;
  goalLabel?: string;
  valueSuffix?: string;
  style?: React.CSSProperties;
}
export declare function GradeChart(props: GradeChartProps): JSX.Element;
