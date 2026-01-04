import { AutoScheduleHeader } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleHeader';
import { AutoScheduleSidebar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleSidebar';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';

export const AutoScheduleMode = () => {
  const { handleNextWeek, handlePrevWeek, month, week } = useWeekIndicator();

  return (
    <InterviewPageLayout
      slots={{
        header: (
          <AutoScheduleHeader
            indicator={{
              week,
              month,
              onNextWeek: handleNextWeek,
              onPrevWeek: handlePrevWeek,
            }}
          />
        ),
        calendar: <div />,
        sidebar: <AutoScheduleSidebar />,
      }}
      variants="sidebar-expand"
    />
  );
};
