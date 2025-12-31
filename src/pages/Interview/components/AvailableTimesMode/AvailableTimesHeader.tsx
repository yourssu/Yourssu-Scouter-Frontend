import { AvailableTimesHeaderChipGroup } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesHeaderChipGroup';
import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { PartFilterDropdown } from '@/pages/Interview/components/PartFilterDropdown';
import { Applicant } from '@/query/applicant/schema';

interface AvailableTimesHeaderProps {
  availableApplicants: Applicant[];
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
}

export const AvailableTimesHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
  availableApplicants,
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
          <PartFilterDropdown />
        </InterviewHeaderLayout.ButtonGroup>
      </InterviewHeaderLayout.Row>
      <InterviewHeaderLayout.Row>
        <AvailableTimesHeaderChipGroup availableApplicants={availableApplicants} />
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
