import * as React from 'react';
/**
 * Chip de filtro alternável com contador e remoção.
 */
export interface FilterChipProps {
  label: string;
  selected?: boolean;
  count?: number;
  icon?: string;
  removable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export declare function FilterChip(props: FilterChipProps): JSX.Element;
