import { IcAlertTriangleFilled } from '@yourssu/design-system-react';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';
import { Schedule } from '@/query/schedule/schema';
import { formatTemplates } from '@/utils/date';

interface InterviewSidebarConflictCardProps {
  schedules: Schedule[];
}

export const InterviewSidebarConflictCard = ({ schedules }: InterviewSidebarConflictCardProps) => {
  return (
    <InterviewSidebarCard>
      <InterviewSidebarCard.Title
        leftIcon={<IcAlertTriangleFilled className="text-icon-brandPrimary size-full" />}
      >
        겹치는 일정 주의
      </InterviewSidebarCard.Title>
      <InterviewSidebarCard.Content>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-3">
          {schedules.map((schedule) => (
            <>
              <div className="typo-b3_sb_14">{schedule.part}</div>
              <div className="flex w-full items-center gap-2">
                <div className="typo-b2_rg_15 bg-bg-basicLight rounded-full px-3 py-2">
                  {schedule.name}
                </div>
                <div className="typo-b1_rg_16 bg-bg-basicLight flex-1 rounded-xl p-3">
                  {formatTemplates['01/01(월) 00:00'](schedule.startTime)}
                </div>
              </div>
            </>
          ))}
        </div>
      </InterviewSidebarCard.Content>
      <InterviewSidebarCard.Warning left="유어슈 동아리방">
        사용이 겹쳐요! 다른 장소를 예약해주세요!
      </InterviewSidebarCard.Warning>
    </InterviewSidebarCard>
  );
};
