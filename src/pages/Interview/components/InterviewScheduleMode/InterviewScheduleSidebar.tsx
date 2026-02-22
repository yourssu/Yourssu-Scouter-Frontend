import { useMemo } from 'react';

import { InterviewSidebarClassroomCard } from '@/pages/Interview/components/InterviewScheduleMode/InterviewSidebarClassroomCard';
import { InterviewSidebarConflictCard } from '@/pages/Interview/components/InterviewScheduleMode/InterviewSidebarConflictCard';
import { InterviewSidebarDownloadCard } from '@/pages/Interview/components/InterviewScheduleMode/InterviewSidebarDownloadCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { useConfilctScheduleGroups } from '@/pages/Interview/hooks/useConfilctScheduleGroups';
import { Schedule } from '@/query/schedule/schema';
import { formatTemplates } from '@/utils/date';

interface InterviewScheduleSidebarProps {
  schedules: Schedule[];
}

export const InterviewScheduleSidebar = ({ schedules }: InterviewScheduleSidebarProps) => {
  const confilctGroups = useConfilctScheduleGroups(schedules);

  const classroomGroups = useMemo(() => {
    const list = schedules.filter((s) => s.locationType === '강의실');
    const groups: Record<string, Schedule[]> = {};
    list.forEach((s) => {
      const dateStr = formatTemplates['01/01(월)'](s.startTime);
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(s);
    });
    return Object.values(groups).sort(
      (a, b) => new Date(a[0].startTime).getTime() - new Date(b[0].startTime).getTime(),
    );
  }, [schedules]);

  return (
    <InterviewSidebarLayout>
      {confilctGroups.length > 0 ? (
        <div className="bg-bg-basicDefault border-line-basicMedium flex w-full shrink-0 flex-col items-start gap-1 border-b px-4 py-3">
          <div className="typo-t4_sb_18 flex items-center">
            <span className="text-text-basicSecondary">장소 겹침</span>
            <span className="text-text-brandSecondary whitespace-pre">
              {' '}
              {confilctGroups.length}건
            </span>
          </div>
          <p className="typo-b2_rg_15 text-text-basicTertiary truncate">
            HR 매니저는 겹치는 장소를 변경해주세요.
          </p>
        </div>
      ) : (
        classroomGroups.length > 0 && (
          <div className="bg-bg-basicDefault border-line-basicMedium flex w-full shrink-0 flex-col items-start gap-1 border-b px-4 py-3">
            <div className="typo-t4_sb_18 flex items-center">
              <span className="text-text-basicSecondary">예약할 장소 목록</span>
            </div>
            <p className="typo-b2_rg_15 text-text-basicTertiary truncate">
              HR 매니저는 아래 정보를 바탕으로 장소를 예약해 주세요
            </p>
          </div>
        )
      )}
      <InterviewSidebarLayout.CardList>
        {confilctGroups.length > 0
          ? confilctGroups.map((group, i) => (
              <InterviewSidebarConflictCard key={i} schedules={group} />
            ))
          : classroomGroups.map((group, i) => (
              <InterviewSidebarClassroomCard key={i} schedules={group} />
            ))}
        <InterviewSidebarDownloadCard />
      </InterviewSidebarLayout.CardList>
    </InterviewSidebarLayout>
  );
};
