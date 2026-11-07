import * as React from 'react';
/**
 * Mensalidade com situação: paga, a vencer, em atraso, processando, acordo.
 */
export interface PaymentStatusProps {
  reference: string;
  student?: string;
  dueDate?: string;
  paidAt?: string;
  amount: string;
  status?: 'paid' | 'pending' | 'overdue' | 'processing' | 'negotiated';
  method?: string;
  onPay?: () => void;
  onReceipt?: () => void;
  variant?: 'card' | 'row';
  style?: React.CSSProperties;
}
export declare function PaymentStatus(props: PaymentStatusProps): JSX.Element;
