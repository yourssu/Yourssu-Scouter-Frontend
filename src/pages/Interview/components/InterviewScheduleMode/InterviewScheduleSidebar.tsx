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
      {confilctGroups.map((group, i) => (
        <InterviewSidebarConflictCard key={i} schedules={group} />
      ))}
      <InterviewSidebarDownloadCard />
    </InterviewSidebarLayout>
  );
};
