import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { InterviewScheduleAddButton } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleAddButton';
import { PartFilterDropdown } from '@/pages/Interview/components/InterviewScheduleMode/PartFilterDropdown';

interface InterviewScheduleHeaderProps {
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
}

export const InterviewScheduleHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
}: InterviewScheduleHeaderProps) => {
  return (
    <InterviewHeaderLayout>
      <InterviewHeaderLayout.Row>
        <InterviewHeaderLayout.Indicator
          date={{ month, week }}
          onNextWeek={onNextWeek}
          onPrevWeek={onPrevWeek}
        />
        <InterviewHeaderLayout.ButtonGroup>
          <PartFilterDropdown />
          <InterviewScheduleAddButton />
        </InterviewHeaderLayout.ButtonGroup>
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
