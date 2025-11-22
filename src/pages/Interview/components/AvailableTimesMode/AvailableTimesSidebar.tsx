import { BoxButton } from '@yourssu/design-system-react';

import { AvailableTimesSidebarDurationCard } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesSidebarDurationCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';

export const AvailableTimesSidebar = () => {
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <AvailableTimesSidebarDurationCard />
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <div className="grid grid-cols-2 gap-3">
          <BoxButton className="w-full" size="xlarge" variant="filledSecondary">
            일정 수동 생성
          </BoxButton>
          <BoxButton className="w-full" size="xlarge" variant="filledPrimary">
            일정 자동 생성
          </BoxButton>
        </div>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
