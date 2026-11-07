'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PortalData } from './use-portal';

const PortalContext = createContext<PortalData | null>(null);

export function PortalProvider({ value, children }: { value: PortalData; children: ReactNode }) {
  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortalData(): PortalData {
  const value = useContext(PortalContext);
  if (!value) throw new Error('Esta área ainda está carregando.');
  return value;
}
