import * as React from 'react';
/**
 * Abas sublinhadas ou segmentadas, com contador opcional.
 */
export interface TabsProps {
  items: Array<{ id: string;
  label: string;
  count?: number;
  disabled?: boolean }>;
  value: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'segmented';
  fullWidth?: boolean;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
