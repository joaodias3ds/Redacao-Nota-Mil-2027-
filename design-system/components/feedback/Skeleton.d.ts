import * as React from 'react';
/**
 * Bloco de carregamento com brilho; linhas, retângulos ou círculos.
 */
export interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  circle?: boolean;
  lines?: number;
  gap?: number;
  style?: React.CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
