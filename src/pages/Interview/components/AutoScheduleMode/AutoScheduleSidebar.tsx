import { BoxButton } from '@yourssu/design-system-react';

import { AutoScheduleThumbnail } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleThumbnail';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { AutoSchedule } from '@/query/schedule/schema';

interface AutoScheduleSidebarProps {
  scheduleCandidates: AutoSchedule[][];
}

export const AutoScheduleSidebar = ({ scheduleCandidates }: AutoScheduleSidebarProps) => {
  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList title="생성된 시간표">
        <div className="flex flex-col gap-5">
          {scheduleCandidates.map((scheduleCandidate, i) => (
            <AutoScheduleThumbnail key={i} schedules={scheduleCandidate} />
          ))}
        </div>
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <BoxButton className="w-full" size="xlarge" variant="filledPrimary">
          시간표 저장하기
        </BoxButton>
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
