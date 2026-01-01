import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { ManualScheduleSaveButton } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSaveButton';
import { ManualScheduleSidebarPartCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarPartCard';
import { ManualScheduleSidebarProgressCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarProgressCard';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleSidebarProps {
  completedApplicants: [Date, Applicant][];
  totalApplicantCount: number;
}

export const ManualScheduleSidebar = ({
  completedApplicants,
  totalApplicantCount,
}: ManualScheduleSidebarProps) => {
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <ManualScheduleSidebarPartCard />
        <ManualScheduleSidebarProgressCard
          completedApplicants={completedApplicants.map(([, applicants]) => applicants)}
          totalApplicantCount={totalApplicantCount}
        />
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
