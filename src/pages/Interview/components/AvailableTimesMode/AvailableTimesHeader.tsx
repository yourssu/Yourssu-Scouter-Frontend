import { AvailableTimesHeaderChipGroup } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesHeaderChipGroup';
import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { PartFilterDropdown } from '@/pages/Interview/components/InterviewScheduleMode/PartFilterDropdown';
import { Applicant } from '@/query/applicant/schema';

interface AvailableTimesHeaderProps {
  applicants: Applicant[];
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
    year: number;
  };
  part: {
    onPartChange: (partName: string) => void;
    partName: string;
  };
}

export const AvailableTimesHeader = ({
  indicator: { year, month, week, onNextWeek, onPrevWeek },
  part: { onPartChange, partName },
  applicants,
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
      <InterviewHeaderLayout.Row>
        <AvailableTimesHeaderChipGroup
          applicants={applicants}
          month={month}
          week={week}
          year={year}
        />
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
