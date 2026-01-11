import { assert } from 'es-toolkit';
import { createContext, useContext } from 'react';

import { ComponentToPngConvertFn } from '@/hooks/useComponentToPng';

interface InterviewScheduleCalendarRefContextProps {
  convert: ComponentToPngConvertFn<HTMLTableElement>;
  ref: (el: HTMLTableElement) => void;
}

export const InterviewScheduleCalendarRefContext =
  createContext<InterviewScheduleCalendarRefContextProps | null>(null);

export const useInterviewScheduleCalendarRefContext = () => {
  const context = useContext(InterviewScheduleCalendarRefContext);
  assert(
    !!context,
    'useInterviewScheduleCalendarRefContext는 InterviewScheduleCalendarRefContext 하위에서 사용해주세요.',
  );
  return context;
};
