import { useSuspenseQuery } from '@tanstack/react-query';

import { useComponentToPng } from '@/hooks/useComponentToPng';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { InterviewScheduleCalendarRefContext } from '@/pages/Interview/components/InterviewScheduleMode/context';
import { InterviewScheduleCalendar } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScehduleCalendar';
import { InterviewScheduleHeader } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleHeader';
import { InterviewScheduleSidebar } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleSidebar';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { scheduleOptions } from '@/query/schedule/options';

export const InterviewScheduleMode = () => {
  const { partId } = useInterviewPartSelectionContext();
  const { year, month, week, handlePrevWeek, handleNextWeek } = useWeekIndicator();

  const { data: schedules } = useSuspenseQuery(scheduleOptions(partId));

  const [ref, convert] = useComponentToPng<HTMLTableElement>();

  return (
    <InterviewScheduleCalendarRefContext.Provider value={{ ref, convert }}>
      <InterviewPageLayout
        slots={{
          header: (
            <InterviewScheduleHeader
              indicator={{
                month,
                week,
                onNextWeek: handleNextWeek,
                onPrevWeek: handlePrevWeek,
              }}
            />
          ),
          calendar: (
            <InterviewScheduleCalendar
              month={month}
              schedules={schedules}
              week={week}
              year={year}
            />
          ),
          sidebar: <InterviewScheduleSidebar schedules={schedules} />,
        }}
        title="면접 일정 관리"
      />
    </InterviewScheduleCalendarRefContext.Provider>
  );
};
