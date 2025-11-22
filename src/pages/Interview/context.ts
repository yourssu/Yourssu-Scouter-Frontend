import { assert } from 'es-toolkit';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import {
  CalendarModeType,
  InterviewAutoScheduleStrategyType,
  InterviewDurationType,
} from '@/pages/Interview/type';

interface InterviewCalendarModeContextProps {
  calendarMode: CalendarModeType;
  setCalendarMode: Dispatch<SetStateAction<CalendarModeType>>;
}

interface InterviewPartSelectionContextProps {
  onPartChange: (partName: null | string) => void;
  partId: null | number;
  partName: null | string;
}

interface InterviewAutoScheduleContextProps {
  duration: InterviewDurationType;
  setDuration: Dispatch<SetStateAction<InterviewDurationType>>;
  setStrategy: Dispatch<SetStateAction<InterviewAutoScheduleStrategyType>>;
  strategy: InterviewAutoScheduleStrategyType;
}

export const InterviewCalendarModeContext = createContext<InterviewCalendarModeContextProps | null>(
  null,
);

export const InterviewPartSelectionContext =
  createContext<InterviewPartSelectionContextProps | null>(null);

export const InterviewAutoScheduleContext = createContext<InterviewAutoScheduleContextProps | null>(
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

export const useInterviewAutoScheduleContext = () => {
  const context = useContext<InterviewAutoScheduleContextProps | null>(
    InterviewAutoScheduleContext,
  );

  assert(
    !!context,
    'useInterviewAutoScheduleContext는 InterviewAutoScheduleContext.Provider 하위에서 사용해야해요.',
  );

  return context;
};
