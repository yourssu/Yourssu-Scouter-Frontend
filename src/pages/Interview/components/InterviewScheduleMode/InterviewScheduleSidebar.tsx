import { InterviewSidebarConflictCard } from '@/pages/Interview/components/InterviewScheduleMode/InterviewSidebarConflictCard';
import { InterviewSidebarDownloadCard } from '@/pages/Interview/components/InterviewScheduleMode/InterviewSidebarDownloadCard';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { useConfilctScheduleGroups } from '@/pages/Interview/hooks/useConfilctScheduleGroups';
import { Schedule } from '@/query/schedule/schema';

interface InterviewScheduleSidebarProps {
  schedules: Schedule[];
}

export const InterviewScheduleSidebar = ({ schedules }: InterviewScheduleSidebarProps) => {
  const confilctGroups = useConfilctScheduleGroups(schedules);

  return (
    <InterviewSidebarLayout>
      {confilctGroups.length > 0 && (
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
      )}
      <InterviewSidebarLayout.CardList>
        {confilctGroups.map((group, i) => (
          <InterviewSidebarConflictCard key={i} schedules={group} />
        ))}
        <InterviewSidebarDownloadCard />
      </InterviewSidebarLayout.CardList>
    </InterviewSidebarLayout>
  );
};
