import { useState } from 'react';
import { SwitchCase } from 'react-simplikit';

import { usePartFilter } from '@/hooks/usePartFilter';
import { AvailableTimesMode } from '@/pages/Interview/components/AvailableTimesMode';
import { InterviewScheduleMode } from '@/pages/Interview/components/InterviewScheduleMode';
import {
  InterviewCalendarModeContext,
  InterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { CalendarModeType } from '@/pages/Interview/type';

export const InterviewPage = () => {
  const [calendarMode, setCalendarMode] = useState<CalendarModeType>('면접일정');
  const { partId, partName, onPartChange } = usePartFilter();

  return (
    <InterviewCalendarModeContext.Provider value={{ calendarMode, setCalendarMode }}>
      <InterviewPartSelectionContext.Provider value={{ partId, partName, onPartChange }}>
        <SwitchCase
          caseBy={{
            면접일정: () => <InterviewScheduleMode />,
            희망일정: () => <AvailableTimesMode />,
            수동생성: () => <div />,
            자동생성: () => <div />,
          }}
          value={calendarMode}
        />
      </InterviewPartSelectionContext.Provider>
    </InterviewCalendarModeContext.Provider>
  );
};
