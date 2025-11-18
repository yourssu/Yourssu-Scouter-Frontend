import { useSuspenseQuery } from '@tanstack/react-query';

import { usePartFilter } from '@/hooks/usePartFilter';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { InterviewScheduleHeader } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleHeader';
import { InterviewSidebar } from '@/pages/Interview/components/InterviewSidebar';
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
          <InterviewCalendar
            month={month}
            partId={partId}
            schedules={schedules}
            week={week}
            year={year}
          />
        ),
        sidebar: <InterviewSidebar schedules={schedules} />,
      }}
      title="면접 일정 관리"
    />
  );
};
