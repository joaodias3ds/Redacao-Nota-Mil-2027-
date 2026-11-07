import * as React from 'react';
/**
 * Indicador de conexão e de alterações aguardando sincronização.
 */
export interface SyncIndicatorProps {
  status?: 'synced' | 'syncing' | 'pending' | 'offline' | 'error';
  pendingCount?: number;
  lastSync?: string;
  variant?: 'pill' | 'banner';
  onRetry?: () => void;
  style?: React.CSSProperties;
}
export declare function SyncIndicator(props: SyncIndicatorProps): JSX.Element;
