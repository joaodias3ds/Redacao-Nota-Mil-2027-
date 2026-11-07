import * as React from 'react';
/**
 * Avatar com foto ou iniciais (fundo rosa suave) e status opcional.
 */
export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  status?: 'online' | 'offline' | 'busy';
  ring?: boolean;
  style?: React.CSSProperties;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
