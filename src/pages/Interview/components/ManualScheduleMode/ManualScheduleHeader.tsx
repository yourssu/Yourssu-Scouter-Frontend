import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { ManualScheduleHeaderChipGroup } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleHeaderChipGroup';
import { ScheduleModeToggleButton } from '@/pages/Interview/components/ScheduleModeToggleButton';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleHeaderProps {
  applicants: Applicant[];
  completedApplicants: Applicant[];
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
  completedApplicants,
  onSelectedApplicantChange,
  indicator: { month, week, onNextWeek, onPrevWeek },
}: ManualScheduleHeaderProps) => {
  const { partName } = useInterviewPartSelectionContext();

  return (
    <InterviewHeaderLayout>
      <InterviewHeaderLayout.Row>
        <InterviewHeaderLayout.Indicator
          date={{ month, week }}
          onNextWeek={onNextWeek}
          onPrevWeek={onPrevWeek}
        />
        {partName && <ScheduleModeToggleButton />}
      </InterviewHeaderLayout.Row>
      <InterviewHeaderLayout.Row>
        {partName && (
          <ManualScheduleHeaderChipGroup
            applicants={applicants}
            completedApplicants={completedApplicants}
            onSelectedApplicantChange={onSelectedApplicantChange}
            selectedApplicant={selectedApplicant}
          />
        )}
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
