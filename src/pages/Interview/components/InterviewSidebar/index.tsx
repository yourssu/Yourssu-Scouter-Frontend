import { InterviewConflictCard } from '@/pages/Interview/components/InterviewSidebar/InterviewConflictCard';
import { InterviewDownloadCard } from '@/pages/Interview/components/InterviewSidebar/InterviewDownloadCard';
import { useConfilctScheduleGroups } from '@/pages/Interview/hooks/useConfilctScheduleGroups';
import { Schedule } from '@/query/schedule/schema';

interface InterviewSidebarProps {
  schedules: Schedule[];
}

export const InterviewSidebar = ({ schedules }: InterviewSidebarProps) => {
  const confilctGroups = useConfilctScheduleGroups(schedules);

  return (
    <div className="bg-bg-basicLight flex h-full w-full flex-col gap-2.5 px-5 py-12">
      {confilctGroups.map((group, i) => (
        <InterviewConflictCard key={i} schedules={group} />
      ))}
      <InterviewDownloadCard />
    </div>
  );
};
