import { BoxButton } from '@yourssu/design-system-react';

import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';

export const AutoScheduleSidebar = () => {
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList title="생성된 시간표" />
      <InterviewSidebarLayout.BottomArea>
        <BoxButton className="w-full" size="xlarge" variant="filledPrimary">
          시간표 저장하기
        </BoxButton>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
