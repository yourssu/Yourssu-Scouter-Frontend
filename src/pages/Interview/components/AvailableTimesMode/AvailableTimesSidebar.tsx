import { BoxButton } from '@yourssu/design-system-react';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import { AvailableTimesSidebarDurationCard } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesSidebarDurationCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import {
  useInterviewCalendarModeContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';

export const AvailableTimesSidebar = () => {
  const { partName } = useInterviewPartSelectionContext();
  const { setCalendarMode } = useInterviewCalendarModeContext();
  const openAlertDialog = useAlertDialog();

  const onManualScheduleModeButtonClick = () => {
    if (!partName) {
      openAlertDialog({
        title: '파트를 선택해주세요',
        content: (
          <>
            일정을 생성하려면 상단에서 파트를 먼저 선택해주세요.
            <img src="/imgs/part-selection-guide.webp" />
          </>
        ),
        primaryButtonText: '확인',
      });
      return;
    }

    setCalendarMode('수동생성');
  };

  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <AvailableTimesSidebarDurationCard />
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <div className="grid grid-cols-2 gap-3">
          <BoxButton
            className="w-full"
            onClick={onManualScheduleModeButtonClick}
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
