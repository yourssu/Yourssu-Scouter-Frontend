import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SwitchCase } from 'react-simplikit';

import { PageLayout } from '@/components/layouts/PageLayout';
import { usePartFilter } from '@/hooks/usePartFilter';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { AvailableTimesHeader } from '@/pages/Interview/components/InterviewHeader/AvailableTimesHeader';
import { InterviewScheduleHeader } from '@/pages/Interview/components/InterviewHeader/InterviewScheduleHeader';
import { InterviewSidebar } from '@/pages/Interview/components/InterviewSidebar';
import { CalendarModeContext } from '@/pages/Interview/context';
import { CalendarModeType } from '@/pages/Interview/type';
import { scheduleOptions } from '@/query/schedule/options';

export const InterviewPage = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [week, setWeek] = useState(2);

  const [calendarMode, setCalendarMode] = useState<CalendarModeType>({
    type: '면접일정보기',
  });
  const { partId, partName, onPartChange } = usePartFilter();
  const { data: schedules } = useSuspenseQuery(scheduleOptions(partId));

  const handlePrevWeek = () => {
    if (week > 0) {
      setWeek(week - 1);
    } else if (month > 1) {
      setMonth(month - 1);
      setWeek(4);
    } else {
      setYear(year - 1);
      setMonth(12);
      setWeek(4);
    }
  };

  const handleNextWeek = () => {
    if (week < 4) {
      setWeek(week + 1);
    } else if (month < 12) {
      setMonth(month + 1);
      setWeek(0);
    } else {
      setYear(year + 1);
      setMonth(1);
      setWeek(0);
    }
  };

  return (
    <CalendarModeContext.Provider value={{ calendarMode, setCalendarMode }}>
      <PageLayout title={calendarMode.type === '면접일정보기' ? '면접 일정 관리' : undefined}>
        <SwitchCase
          caseBy={{
            면접일정보기: () => (
              <InterviewScheduleHeader
                indicator={{ month, week, onNextWeek: handleNextWeek, onPrevWeek: handlePrevWeek }}
                part={{ partName, onPartChange }}
              />
            ),
            희망일정보기: () => (
              <AvailableTimesHeader
                indicator={{ month, week, onNextWeek: handleNextWeek, onPrevWeek: handlePrevWeek }}
                part={{ partName, onPartChange }}
              />
            ),
            일정수동지정: () => <div />,
            일정자동생성: () => <div />,
          }}
          value={calendarMode.type}
        />

        <div className="flex flex-[1_1_0] overflow-hidden">
          <div className="flex min-w-0 flex-col pt-12 pr-6" style={{ width: '70%' }}>
            <InterviewCalendar
              month={month}
              partId={partId}
              schedules={schedules}
              week={week}
              year={year}
            />
          </div>
          <div className="flex-1">
            <InterviewSidebar schedules={schedules} />
          </div>
        </div>
      </PageLayout>
    </CalendarModeContext.Provider>
  );
};
