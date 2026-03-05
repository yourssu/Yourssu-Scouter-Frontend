import { tv } from 'tailwind-variants';

import type { Schedule } from '@/query/schedule/schema';

import { partNames } from '@/types/part';
import { formatTemplates } from '@/utils/date';

const container = tv({
  base: 'size-full min-h-[56px] min-w-0 rounded-lg px-3 py-2',
  variants: {
    part: {
      'Product Design': 'bg-table-productDesignBackground',
      'Web FE': 'bg-table-frontendBackground',
      iOS: 'bg-table-iosBackground',
      Android: 'bg-table-androidBackground',
      Backend: 'bg-table-backendBackground',
      Legal: 'bg-table-legalBackground',
      Marketing: 'bg-table-marketingBackground',
      PM: 'bg-table-pmBackground',
      HR: 'bg-table-hrBackground',
      Finance: 'bg-table-hrBackground',
    } satisfies Record<(typeof partNames)[number], string>,
  },
});

interface InterviewScheduleBlockProps {
  isFirstBlock?: boolean;
  schedule: Schedule;
}

export const InterviewScheduleBlock = ({
  schedule,
  isFirstBlock = true,
}: InterviewScheduleBlockProps) => {
  const locationLabel = (() => {
    const { locationType, locationDetail } = schedule;
    if (locationType === '동방') {
      return '동아리방';
    }
    if (locationType === '비대면') {
      return locationDetail || '비대면';
    }
    return locationDetail || '';
  })();

  return (
    <div className={container({ part: schedule.part })}>
      {isFirstBlock && (
        <>
          <div className="mb-1 truncate">
            <span className="typo-c1_sb_13">{schedule.name} 님</span>
            <span className="typo-c3_sb_11 text-text-basicTertiary ml-1.5">{schedule.part}</span>
          </div>
          <div className="typo-c3_rg_11 text-text-basicTertiary truncate">
            <span>{formatTemplates['23:59'](schedule.startTime)}</span>
            {locationLabel && <span className="ml-1.5">{locationLabel}</span>}
          </div>
        </>
      )}
    </div>
  );
};
