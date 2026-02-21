import { IcArrowsChevronDownLine, IcClockFilled } from '@yourssu/design-system-react';
import { differenceInMinutes } from 'date-fns';

import { Schedule } from '@/query/schedule/schema';
import { formatTemplates } from '@/utils/date';

interface InterviewSidebarConflictCardProps {
  schedules: Schedule[];
}

function formatDuration(startTime: string, endTime: string) {
  const diff = differenceInMinutes(endTime, startTime);
  if (diff >= 60) {
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${hours}시간${mins > 0 ? ` ${mins}분` : ''}`;
  }
  return `${diff}분`;
}

export const InterviewSidebarConflictCard = ({ schedules }: InterviewSidebarConflictCardProps) => {
  if (!schedules.length) {
    return null;
  }

  const dateStr = formatTemplates['01/01(월)'](schedules[0].startTime);

  return (
    <div className="bg-bg-basicDefault border-line-basicMedium flex w-full flex-col gap-4 rounded-[14px] border p-4">
      <div className="flex w-full items-center justify-between">
        <p className="typo-b1_sb_16 text-text-basicSecondary truncate">{dateStr}</p>
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        {schedules.map((schedule) => (
          <div className="flex w-full flex-col items-start gap-2" key={schedule.id}>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-bg-basicLight flex h-8 shrink-0 items-center justify-center rounded-[40px] px-3">
                  <span className="typo-b3_rg_14 text-text-basicSecondary text-center">
                    {schedule.name}
                  </span>
                </div>
                <p className="typo-b3_sb_14 text-text-basicTertiary truncate">{schedule.part}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="typo-b2_rg_15 text-text-basicTertiary truncate">
                  {formatTemplates['23:59'](schedule.startTime)}~
                  {formatTemplates['23:59'](schedule.endTime)}
                </p>
                <div className="bg-line-basicMedium h-[14px] w-px shrink-0" />
                <div className="flex shrink-0 items-center gap-1">
                  <IcClockFilled className="text-text-basicSecondary size-4" />
                  <p className="typo-b3_sb_14 text-text-basicSecondary">
                    {formatDuration(schedule.startTime, schedule.endTime)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-bg-basicDefault border-line-basicMedium flex h-12 w-full shrink-0 items-center gap-1 rounded-xl border px-4">
              <p className="typo-b1_sb_16 text-text-basicPrimary flex-1 whitespace-pre-wrap">
                동아리방
              </p>
              <IcArrowsChevronDownLine className="size-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
