import { BoxButton } from '@yourssu/design-system-react';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';

export const InterviewSidebarDownloadCard = () => {
  return (
    <InterviewSidebarCard>
      <InterviewSidebarCard.Title>면접 일정 저장</InterviewSidebarCard.Title>
      <InterviewSidebarCard.Content>
        Jpeg로 저장된 면접 일정을 다운로드 할 수 있어요!
      </InterviewSidebarCard.Content>
      <BoxButton size="small" variant="filledPrimary">
        시간표 저장하기
      </BoxButton>
    </InterviewSidebarCard>
  );
};
