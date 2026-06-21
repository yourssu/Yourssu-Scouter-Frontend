import { ScheduleTooltip } from '@/pages/NewInterview/components/ScheduleTooltip';
import { partColorMap, partNameKo } from '@/pages/NewInterview/type';
import { Applicant } from '@/query/applicant/schema';
import { Schedule } from '@/query/schedule/schema';
import { formatTemplates } from '@/utils/date';

interface MonthlyScheduleItemProps {
  applicant: Applicant;
  schedule: Schedule;
}

export const MonthlyScheduleItem = ({ applicant, schedule }: MonthlyScheduleItemProps) => {
  const color = partColorMap[schedule.part as keyof typeof partColorMap];

  return (
    <ScheduleTooltip
      applicant={applicant}
      contentProps={{ side: 'left', sideOffset: 10 }}
      endTime={schedule.endTime}
      locationDetail={schedule.locationDetail}
      locationType={schedule.locationType}
      startTime={schedule.startTime}
    >
      <div className="flex cursor-pointer items-center gap-1.5 rounded p-0.5 text-xs font-medium text-[#4e5968] hover:bg-[rgba(2,32,71,0.05)]">
        <div
          className="h-full w-1 shrink-0 rounded-[2px]"
          style={{ backgroundColor: color.base }}
        />
        <span className="shrink-0" style={{ color: color.base }}>
          {partNameKo[schedule.part as keyof typeof partNameKo]}
        </span>
        <span className="shrink-0">{formatTemplates['23:59'](schedule.startTime)}</span>
        <span className="flex-[1_1] overflow-hidden text-left break-all text-ellipsis whitespace-nowrap text-[#6b7684]">
          {schedule.name}
        </span>
      </div>
    </ScheduleTooltip>
  );
};
