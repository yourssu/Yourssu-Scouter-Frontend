import { tv } from 'tailwind-variants';

import type { Schedule } from '@/query/schedule/schema';

import { partNames } from '@/types/part';
import { formatTemplates } from '@/utils/date';

const container = tv({
  base: 'size-full min-h-[64px] cursor-pointer rounded-lg p-3 text-sm text-gray-800 transition-shadow hover:shadow-md',
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
          <div className="mb-1 font-semibold">
            {schedule.name} 님 {schedule.part}
          </div>
          <div className="text-xs opacity-80">{formatTemplates['23:59'](schedule.startTime)}</div>
        </>
      )}
    </div>
  );
};
