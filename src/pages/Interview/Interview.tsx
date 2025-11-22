import { useState } from 'react';
import { SwitchCase } from 'react-simplikit';

import { usePartFilter } from '@/hooks/usePartFilter';
import { AvailableTimesMode } from '@/pages/Interview/components/AvailableTimesMode';
import { InterviewScheduleMode } from '@/pages/Interview/components/InterviewScheduleMode';
import {
  InterviewAutoScheduleContext,
  InterviewCalendarModeContext,
  InterviewPartSelectionContext,
} from '@/pages/Interview/context';
import {
  CalendarModeType,
  InterviewAutoScheduleStrategyType,
  InterviewDurationType,
} from '@/pages/Interview/type';

export const InterviewPage = () => {
  const [calendarMode, setCalendarMode] = useState<CalendarModeType>('면접일정');
  const [duration, setDuration] = useState<InterviewDurationType>('1시간');
  const [strategy, setStrategy] = useState<InterviewAutoScheduleStrategyType>('분산형');
  const { partId, partName, onPartChange } = usePartFilter();

  return (
    <InterviewCalendarModeContext.Provider value={{ calendarMode, setCalendarMode }}>
      <InterviewPartSelectionContext.Provider value={{ partId, partName, onPartChange }}>
        <InterviewAutoScheduleContext.Provider
          value={{ duration, setDuration, strategy, setStrategy }}
        >
          <SwitchCase
            caseBy={{
              면접일정: () => <InterviewScheduleMode />,
              희망일정: () => <AvailableTimesMode />,
              수동생성: () => <div />,
              자동생성: () => <div />,
            }}
            value={calendarMode}
          />
        </InterviewAutoScheduleContext.Provider>
      </InterviewPartSelectionContext.Provider>
    </InterviewCalendarModeContext.Provider>
  );
};
