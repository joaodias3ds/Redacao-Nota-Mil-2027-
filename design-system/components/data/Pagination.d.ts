import * as React from 'react';
/**
 * Paginação numérica (web) ou compacta "1 de 8" (mobile).
 */
export interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  compact?: boolean;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
