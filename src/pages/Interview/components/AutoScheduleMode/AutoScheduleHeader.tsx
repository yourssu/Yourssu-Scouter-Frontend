import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { ScheduleModeToggleButton } from '@/pages/Interview/components/ScheduleModeToggleButton';

interface AutoScheduleHeaderProps {
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
}

export const AutoScheduleHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
}: AutoScheduleHeaderProps) => {
  return (
    <InterviewHeaderLayout>
      <InterviewHeaderLayout.Row>
        <InterviewHeaderLayout.Indicator
          date={{ month, week }}
          onNextWeek={onNextWeek}
          onPrevWeek={onPrevWeek}
        />
        <ScheduleModeToggleButton />
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
