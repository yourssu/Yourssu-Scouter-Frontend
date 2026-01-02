import { BoxButton } from '@yourssu/design-system-react';

import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { ManualScheduleSidebarPartCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarPartCard';
import { ManualScheduleSidebarProgressCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarProgressCard';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleSidebarProps {
  completedApplicants: Applicant[];
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
          completedApplicants={completedApplicants}
          totalApplicantCount={totalApplicantCount}
        />
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <BoxButton className="w-full" size="xlarge" variant="filledPrimary">
          시간표 저장하기
        </BoxButton>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
