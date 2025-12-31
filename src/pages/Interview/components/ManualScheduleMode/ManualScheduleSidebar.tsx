import { BoxButton } from '@yourssu/design-system-react';

import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';

export const ManualScheduleSidebar = () => {
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList />
      <InterviewSidebarLayout.BottomArea>
        <BoxButton className="w-full" size="xlarge" variant="filledPrimary">
          시간표 저장하기
        </BoxButton>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
