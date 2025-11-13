import { tv } from 'tailwind-variants';

import type { Schedule } from '@/query/schedule/schema';

import { partNames } from '@/types/part';
import { formatTemplates } from '@/utils/date';

const container = tv({
  base: 'size-full min-h-[56px] rounded-lg px-3 py-2',
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
  return (
    <div className={container({ part: schedule.part })}>
      {isFirstBlock && (
        <>
          <div className="mb-1">
            <span className="typo-c1_sb_13">{schedule.name} 님</span>{' '}
            <span className="typo-c3_sb_11 text-text-basicTertiary">{schedule.part}</span>
          </div>
          <div className="typo-c3_rg_11 text-text-basicTertiary">
            {formatTemplates['23:59'](schedule.startTime)}
          </div>
        </>
      )}
    </div>
  );
};
