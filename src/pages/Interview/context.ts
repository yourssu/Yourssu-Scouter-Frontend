import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { CalendarModeType } from '@/pages/Interview/type';

type CalendarModeContextType = {
  calendarMode: CalendarModeType;
  setCalendarMode: Dispatch<SetStateAction<CalendarModeType>>;
};

export const CalendarModeContext = createContext<CalendarModeContextType | null>(null);

export const useCalendarModeContext = () => {
  const context = useContext(CalendarModeContext);
  if (!context) {
    throw new Error('useCalendarModeContext는 CalendarModeContext 하위에서 사용해야해요.');
  }
  return context;
};
