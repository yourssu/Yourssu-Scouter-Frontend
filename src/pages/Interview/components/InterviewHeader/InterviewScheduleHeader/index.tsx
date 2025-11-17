import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeader/InterviewHeaderLayout';
import { InterviewScheduleAddButton } from '@/pages/Interview/components/InterviewHeader/InterviewScheduleHeader/InterviewScheduleAddButton';
import { PartFilterDropdown } from '@/pages/Interview/components/InterviewHeader/InterviewScheduleHeader/PartFilterDropdown';

interface InterviewScheduleHeaderProps {
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
  part: {
    onPartChange: (partName: string) => void;
    partName: string;
  };
}

export const InterviewScheduleHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
  part: { partName, onPartChange },
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
          <PartFilterDropdown onPartChange={onPartChange} partName={partName} />
          <InterviewScheduleAddButton />
        </InterviewHeaderLayout.ButtonGroup>
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
