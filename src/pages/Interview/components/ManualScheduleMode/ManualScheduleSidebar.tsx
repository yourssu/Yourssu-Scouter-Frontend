import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { ManualScheduleSaveButton } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSaveButton';
import { ManualScheduleSidebarDurationCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarDurationCard';
import { ManualScheduleSidebarMethodCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarMethodCard';
import { ManualScheduleSidebarPartCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarPartCard';
import { ManualScheduleSidebarProgressCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarProgressCard';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleSidebarProps {
  completedApplicants: [Date, Applicant][];
  method: '대면' | '비대면';
  onChangeMethod: (method: '대면' | '비대면') => void;
  totalApplicantCount: number;
}

export const ManualScheduleSidebar = ({
  completedApplicants,
  method,
  onChangeMethod,
  totalApplicantCount,
}: ManualScheduleSidebarProps) => {
  const { partId } = useInterviewPartSelectionContext();
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <ManualScheduleSidebarPartCard />
        <ManualScheduleSidebarMethodCard method={method} onChangeMethod={onChangeMethod} />
        <ManualScheduleSidebarDurationCard />
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
