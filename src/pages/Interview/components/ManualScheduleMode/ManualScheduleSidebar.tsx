import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { ScheduledApplicant } from '@/pages/Interview/components/ManualScheduleMode/index';
import { ManualScheduleSaveButton } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSaveButton';
import { ManualScheduleSidebarDurationCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarDurationCard';
import { ManualScheduleSidebarMethodCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarMethodCard';
import { ManualScheduleSidebarPartCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarPartCard';
import { ManualScheduleSidebarProgressCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarProgressCard';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';

interface ManualScheduleSidebarProps {
  completedApplicants: [Date, ScheduledApplicant][];
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
            completedApplicants={completedApplicants}
            totalApplicantCount={totalApplicantCount}
          />
        )}
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <ManualScheduleSaveButton
          completedApplicants={completedApplicants}
          method={method}
          totalApplicantCount={totalApplicantCount}
        />
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
