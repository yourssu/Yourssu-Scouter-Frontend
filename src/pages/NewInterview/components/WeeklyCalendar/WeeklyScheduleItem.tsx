import clsx from 'clsx';
import { useState } from 'react';

import { useResizeObserver } from '@/hooks/useResizeObserver';
import { ScheduleTooltip } from '@/pages/NewInterview/components/ScheduleTooltip';
import { partColorMap, partNameKo } from '@/pages/NewInterview/type';
import { Applicant } from '@/query/applicant/schema';
import { Schedule } from '@/query/schedule/schema';

interface WeeklyScheduleItemProps {
  applicant: Applicant;
  schedule: Schedule;
}

export const WeeklyScheduleItem = ({ applicant, schedule }: WeeklyScheduleItemProps) => {
  const color = partColorMap[schedule.part as keyof typeof partColorMap];

  const [isCompact, setIsCompact] = useState(false);
  const ref = useResizeObserver<HTMLDivElement>((entry) => {
    setIsCompact(entry.contentRect.height < 48);
  });

  return (
    <ScheduleTooltip
      applicant={applicant}
      contentProps={{ side: 'left', sideOffset: 10 }}
      endTime={schedule.endTime}
      locationDetail={schedule.locationDetail}
      locationType={schedule.locationType}
      startTime={schedule.startTime}
    >
      <div
        className="h-[calc(100%-2px)] w-full cursor-pointer overflow-hidden rounded-lg border-2 border-[#ffffff] px-2.5 pt-1.5 pb-0.5 hover:brightness-90"
        ref={ref}
        style={{
          backgroundColor: color.light,
        }}
      >
        <div
          className={clsx(
            'flex',
            isCompact ? 'flex-row items-center gap-1.5' : 'flex-col items-start gap-0',
          )}
        >
          <div className="shrink-0 text-sm font-semibold">{schedule.name}</div>
          <div className="truncate text-xs font-medium text-[rgba(3,18,40,0.7)]">
            {partNameKo[schedule.part as keyof typeof partNameKo]}
          </div>
        </div>
      </div>
    </ScheduleTooltip>
  );
};
