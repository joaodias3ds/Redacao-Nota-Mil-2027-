import * as React from 'react';
/**
 * Seletor de perfil (Admin, Professor, Aluno, Responsável) para usuários com mais de um papel.
 */
export interface ProfileSwitcherProps {
  user: { name: string };
  profiles: Array<{ id: string;
  role: 'admin' | 'teacher' | 'student' | 'guardian';
  label?: string;
  icon?: string }>;
  value?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  compact?: boolean;
  style?: React.CSSProperties;
}
export declare function ProfileSwitcher(props: ProfileSwitcherProps): JSX.Element;
