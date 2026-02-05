import { useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton } from '@yourssu/design-system-react';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import { AvailableTimesSidebarDurationCard } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesSidebarDurationCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import {
  useInterviewCalendarModeContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { CalendarModeType } from '@/pages/Interview/type';
import { applicantOptions } from '@/query/applicant/options';
import { semesterNowOptions } from '@/query/semester/now/options';

export const AvailableTimesSidebar = () => {
  const { partId, partName } = useInterviewPartSelectionContext();
  const { setCalendarMode } = useInterviewCalendarModeContext();

  const { data: semesterNow } = useSuspenseQuery(semesterNowOptions());
  const { data: applicants } = useSuspenseQuery(
    applicantOptions({ partId, semesterId: semesterNow.semesterId }),
  );

  const openAlertDialog = useAlertDialog();

  const onScheduleModeButtonClick = (mode: Extract<CalendarModeType, '수동생성' | '자동생성'>) => {
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

    if (applicants.length === 0) {
      openAlertDialog({
        title: '선택한 파트에 지원자가 없어요',
        content: '지원자가 있는 파트를 선택해주세요.',
        primaryButtonText: '확인',
      });
      return;
    }

    setCalendarMode(mode);
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
            onClick={() => onScheduleModeButtonClick('수동생성')}
            size="xlarge"
            variant="filledSecondary"
          >
            일정 수동 생성
          </BoxButton>
          <BoxButton
            className="w-full"
            onClick={() => onScheduleModeButtonClick('자동생성')}
            size="xlarge"
            variant="filledPrimary"
          >
            일정 자동 생성
          </BoxButton>
        </div>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
