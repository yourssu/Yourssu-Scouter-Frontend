import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { ManualScheduleHeader } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleHeader';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';

export const ManualScheduleMode = () => {
  const { month, week, handlePrevWeek, handleNextWeek } = useWeekIndicator();

  return (
    <InterviewPageLayout
      slots={{
        header: (
          <ManualScheduleHeader
            indicator={{
              month,
              onNextWeek: handleNextWeek,
              onPrevWeek: handlePrevWeek,
              week,
            }}
          />
        ),
        calendar: <div />,
        sidebar: <div />,
      }}
    />
  );
};
