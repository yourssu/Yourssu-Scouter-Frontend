import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { PartFilterDropdown } from '@/pages/Interview/components/InterviewScheduleMode/PartFilterDropdown';

interface AvailableTimesHeaderProps {
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

export const AvailableTimesHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
  part: { onPartChange, partName },
}: AvailableTimesHeaderProps) => {
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
        </InterviewHeaderLayout.ButtonGroup>
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
