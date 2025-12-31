import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { ManualScheduleHeaderChipGroup } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleHeaderChipGroup';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleHeaderProps {
  applicants: Applicant[];
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
  onSelectedApplicantChange: (v: Applicant) => void;
  selectedApplicant: Applicant;
}

export const ManualScheduleHeader = ({
  applicants,
  selectedApplicant,
  onSelectedApplicantChange,
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
      <InterviewHeaderLayout.Row>
        <ManualScheduleHeaderChipGroup
          applicants={applicants}
          onSelectedApplicantChange={onSelectedApplicantChange}
          selectedApplicant={selectedApplicant}
        />
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
