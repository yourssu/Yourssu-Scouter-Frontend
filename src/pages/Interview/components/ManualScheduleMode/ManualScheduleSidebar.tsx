import { BoxButton } from '@yourssu/design-system-react';

import { useAlertDialog } from '@/hooks/useAlertDialog';
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
  const openAlertDialog = useAlertDialog();

  const onSaveSchedule = () => {
    if (completedApplicants.length < totalApplicantCount) {
      openAlertDialog({
        title: '지원자를 모두 배정해주세요',
        content: '아직 면접 시간이 배정되지 않은 지원자가 있어요.',
        primaryButtonText: '확인',
      });
      return;
    }
  };

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
        <BoxButton
          className="w-full"
          onClick={onSaveSchedule}
          size="xlarge"
          variant="filledPrimary"
        >
          시간표 저장하기
        </BoxButton>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
