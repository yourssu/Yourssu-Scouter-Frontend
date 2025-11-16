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
      {confilctGroups.map((_, i) => (
        <div key={i}>일정 겹침</div>
      ))}
      <InterviewDownloadCard />
    </div>
  );
};
