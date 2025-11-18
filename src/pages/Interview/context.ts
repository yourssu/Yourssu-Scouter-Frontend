import { assert } from 'es-toolkit';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { CalendarModeType } from '@/pages/Interview/type';

interface InterviewCalendarModeContextProps {
  calendarMode: CalendarModeType;
  setCalendarMode: Dispatch<SetStateAction<CalendarModeType>>;
}

export const InterviewCalendarModeContext = createContext<InterviewCalendarModeContextProps | null>(
  null,
);

export const useInterviewCalendarModeContext = () => {
  const context = useContext<InterviewCalendarModeContextProps | null>(
    InterviewCalendarModeContext,
  );

  assert(
    !!context,
    'useInterviewCalendarModeContext는 InterviewCalendarModeContext.Provider 하위에서 사용해야해요.',
  );

  return context;
};
