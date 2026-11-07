import * as React from 'react';
/**
 * Linha de chamada: presente, falta, justificada ou ainda não preenchida.
 */
export interface AttendanceRowProps {
  name: string;
  detail?: string;
  status?: 'present' | 'absent' | 'justified' | 'pending';
  onChange?: (status: 'present' | 'absent' | 'justified' | 'pending') => void;
  readOnly?: boolean;
  divider?: boolean;
  style?: React.CSSProperties;
}
export declare function AttendanceRow(props: AttendanceRowProps): JSX.Element;
