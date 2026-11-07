import * as React from 'react';
/**
 * Tabela para telas administrativas com ordenação, densidade e linha selecionada.
 * @startingPoint section="Dados" subtitle="Tabela administrativa com filtros e paginação" viewport="700x420"
 */
export interface DataTableProps {
  columns: Array<{ key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  numeric?: boolean;
  sortable?: boolean;
  nowrap?: boolean;
  width?: number | string;
  render?: (row: any) => React.ReactNode }>;
  rows: Array<Record<string, any>>;
  density?: 'compact' | 'regular';
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  onRowClick?: (row: any) => void;
  selectedId?: string | number;
  emptyText?: string;
  caption?: string;
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
