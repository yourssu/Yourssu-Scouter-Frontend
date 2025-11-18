import { useState } from 'react';
import { SwitchCase } from 'react-simplikit';

import { InterviewScheduleMode } from '@/pages/Interview/components/InterviewScheduleMode';
import { InterviewCalendarModeContext } from '@/pages/Interview/context';
import { CalendarModeType } from '@/pages/Interview/type';

export const InterviewPage = () => {
  const [calendarMode, setCalendarMode] = useState<CalendarModeType>('면접일정');

  return (
    <InterviewCalendarModeContext.Provider value={{ calendarMode, setCalendarMode }}>
      <SwitchCase
        caseBy={{
          면접일정: () => <InterviewScheduleMode />,
          수동생성: () => <div />,
          자동생성: () => <div />,
          희망일정: () => <div />,
        }}
        value={calendarMode}
      />
    </InterviewCalendarModeContext.Provider>
  );
};
