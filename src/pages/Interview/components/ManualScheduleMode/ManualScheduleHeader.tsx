import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';

interface ManualScheduleHeaderProps {
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
}

export const ManualScheduleHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
}: ManualScheduleHeaderProps) => {
  return (
    <InterviewHeaderLayout>
      <InterviewHeaderLayout.Row>
        <InterviewHeaderLayout.Indicator
          date={{ month, week }}
          onNextWeek={onNextWeek}
          onPrevWeek={onPrevWeek}
        />
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
