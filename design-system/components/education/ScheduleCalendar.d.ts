import * as React from 'react';
/**
 * Calendário semanal (web) ou agenda em lista (mobile) de aulas.
 */
export interface ScheduleCalendarProps {
  days: Array<{ id: string;
  weekday: string;
  day: string | number;
  events?: Array<{ start: string;
  end: string;
  title: string;
  place?: string;
  status?: 'scheduled' | 'changed' | 'cancelled' }> }>;
  mode?: 'week' | 'agenda';
  todayId?: string;
  title?: string;
  onPrev?: () => void;
  onNext?: () => void;
  style?: React.CSSProperties;
}
export declare function ScheduleCalendar(props: ScheduleCalendarProps): JSX.Element;
