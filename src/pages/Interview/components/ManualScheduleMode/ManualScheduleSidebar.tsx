import { AvailableTimesSidebarDurationCard } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesSidebarDurationCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { ManualScheduleSaveButton } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSaveButton';
import { ManualScheduleSidebarPartCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarPartCard';
import { ManualScheduleSidebarProgressCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarProgressCard';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleSidebarProps {
  completedApplicants: [Date, Applicant][];
  totalApplicantCount: number;
}

export const ManualScheduleSidebar = ({
  completedApplicants,
  totalApplicantCount,
}: ManualScheduleSidebarProps) => {
  const { partId } = useInterviewPartSelectionContext();
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <ManualScheduleSidebarPartCard />
        <AvailableTimesSidebarDurationCard />
        {partId && (
          <ManualScheduleSidebarProgressCard
            completedApplicants={completedApplicants.map(([, applicants]) => applicants)}
            totalApplicantCount={totalApplicantCount}
          />
        )}
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <ManualScheduleSaveButton
          completedApplicants={completedApplicants}
          totalApplicantCount={totalApplicantCount}
        />
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
