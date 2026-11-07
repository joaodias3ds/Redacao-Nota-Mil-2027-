import * as React from 'react';
/**
 * Etapas de matrícula com indicação de salvamento automático.
 */
export interface EnrollmentStepperProps {
  steps: Array<{ id?: string;
  label: string }>;
  current: number;
  saveState?: 'saved' | 'saving' | 'unsaved' | 'error' | 'offline';
  lastSaved?: string;
  variant?: 'full' | 'compact';
  onStepClick?: (index: number) => void;
  style?: React.CSSProperties;
}
export declare function EnrollmentStepper(props: EnrollmentStepperProps): JSX.Element;
