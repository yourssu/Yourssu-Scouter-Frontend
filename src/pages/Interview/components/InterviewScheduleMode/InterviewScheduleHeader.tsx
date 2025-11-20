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
