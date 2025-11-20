import { assert } from 'es-toolkit';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { CalendarModeType } from '@/pages/Interview/type';

interface InterviewCalendarModeContextProps {
  calendarMode: CalendarModeType;
  setCalendarMode: Dispatch<SetStateAction<CalendarModeType>>;
}

interface InterviewPartSelectionContextProps {
  onPartChange: (partName: null | string) => void;
  partId: null | number;
  partName: null | string;
}

export const InterviewCalendarModeContext = createContext<InterviewCalendarModeContextProps | null>(
  null,
);

export const InterviewPartSelectionContext =
  createContext<InterviewPartSelectionContextProps | null>(null);

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

export const useInterviewPartSelectionContext = () => {
  const context = useContext<InterviewPartSelectionContextProps | null>(
    InterviewPartSelectionContext,
  );

  assert(
    !!context,
    'useInterviewPartSelectionContext는 InterviewPartSelectionContext.Provider 하위에서 사용해야해요.',
  );

  return context;
};
