import * as React from 'react';
/**
 * Interruptor para preferências com efeito imediato (ex.: notificações).
 */
export interface SwitchProps {
  label?: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
