import clsx from 'clsx';

import type { Schedule } from '@/query/schedule/schema';

import { formatTemplates } from '@/utils/date';

interface InterviewScheduleBlockProps {
  isFirstBlock?: boolean;
  schedule: Schedule;
}

const PART_COLORS: Record<string, string> = {
  'Prd Design': 'bg-[#F2F4FF] text-gray-800',
  'Web-FE': 'bg-[#F7FFF8] text-gray-800',
  iOS: 'bg-[#F2FCFF] text-gray-800',
  And: 'bg-[#FCF3FF] text-gray-800',
  Backend: 'bg-[#F7F8F8] text-gray-800',
  Legal: 'bg-[#FFFAE2] text-gray-800',
  Marketing: 'bg-[#FFF3F3] text-gray-800',
  PM: 'bg-[#FFF5F2] text-gray-800',
  HR: 'bg-[#F1F1F4] text-gray-800',
};

const getPartColor = (part: string): string => {
  return PART_COLORS[part] || 'bg-gray-100 text-gray-700';
};

export const InterviewScheduleBlock = ({
  schedule,
  isFirstBlock = true,
}: InterviewScheduleBlockProps) => {
  const colorClass = getPartColor(schedule.part);

  return (
    <div
      className={clsx(
        'size-full min-h-[64px] cursor-pointer rounded-lg p-3 text-sm transition-shadow hover:shadow-md',
        colorClass,
      )}
    >
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
