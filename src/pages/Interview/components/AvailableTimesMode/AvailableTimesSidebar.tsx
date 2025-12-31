import { BoxButton } from '@yourssu/design-system-react';

import { AvailableTimesSidebarDurationCard } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesSidebarDurationCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { useInterviewCalendarModeContext } from '@/pages/Interview/context';

export const AvailableTimesSidebar = () => {
  const { setCalendarMode } = useInterviewCalendarModeContext();

  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <AvailableTimesSidebarDurationCard />
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <div className="grid grid-cols-2 gap-3">
          <BoxButton
            className="w-full"
            onClick={() => setCalendarMode('수동생성')}
            size="xlarge"
            variant="filledSecondary"
          >
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
