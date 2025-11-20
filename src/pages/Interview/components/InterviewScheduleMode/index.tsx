import { useSuspenseQuery } from '@tanstack/react-query';

import { usePartFilter } from '@/hooks/usePartFilter';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { InterviewScheduleCalendar } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScehduleCalendar';
import { InterviewScheduleHeader } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleHeader';
import { InterviewScheduleSidebar } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleSidebar';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { scheduleOptions } from '@/query/schedule/options';

export const InterviewScheduleMode = () => {
  const { partId, partName, onPartChange } = usePartFilter();
  const { year, month, week, handlePrevWeek, handleNextWeek } = useWeekIndicator();

  const { data: schedules } = useSuspenseQuery(scheduleOptions(partId));

  return (
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
            part={{
              partName,
              onPartChange,
            }}
          />
        ),
        calendar: (
          <InterviewScheduleCalendar month={month} schedules={schedules} week={week} year={year} />
        ),
        sidebar: <InterviewScheduleSidebar schedules={schedules} />,
      }}
      title="면접 일정 관리"
    />
  );
};
