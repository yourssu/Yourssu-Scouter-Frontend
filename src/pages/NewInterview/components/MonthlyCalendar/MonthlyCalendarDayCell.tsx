import clsx from 'clsx';
import { getDate, isSunday, isToday } from 'date-fns';
import { assert } from 'es-toolkit';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

import { MonthlyScheduleItem } from '@/pages/NewInterview/components/MonthlyCalendar/MonthlyScheduleItem';
import { MonthlyCalendarDateState } from '@/pages/NewInterview/utils/calendar';
import { Applicant } from '@/query/applicant/schema';
import { Schedule } from '@/query/schedule/schema';

interface MonthlyCalendarDayCellProps {
  applicants: Applicant[];
  date: Date;
  schedules: Schedule[];
  state: MonthlyCalendarDateState;
}

const day = tv({
  base: 'text-[15px] font-medium',
  variants: {
    type: {
      today: 'text-[#4a3fe0]',
      sunday: 'text-[#f04452]',
      otherMonth: 'text-[#b0b8c1]',
      normal: 'text-[#4e5968]',
    },
  },
});

export const MonthlyCalendarDayCell = ({
  applicants,
  date,
  state,
  schedules,
}: MonthlyCalendarDayCellProps) => {
  const [showAllSchedules, setShowAllSchedules] = useState(false);

  const visibleSchedules = showAllSchedules ? schedules : schedules.slice(0, 3);

  const getDayVariants = () => {
    if (state !== '이번달') {
      return 'otherMonth';
    }
    if (isToday(date)) {
      return 'today';
    }
    if (isSunday(date)) {
      return 'sunday';
    }
    return 'normal';
  };

  return (
    <div
      className={clsx(
        'flex min-h-30 min-w-25 flex-[1_1] flex-col gap-1 rounded-lg border p-2',
        isToday(date) ? 'border-[rgba(2,32,71,0.05)] bg-[#f9fafb]' : 'border-transparent',
      )}
    >
      <div className="flex items-start justify-between">
        <span className={day({ type: getDayVariants() })}>
          {getDate(date)}
          {isToday(date) && <span className="ml-1">오늘</span>}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {visibleSchedules.map((schedule) => {
          const applicant = applicants.find((applicant) => applicant.name === schedule.name);
          assert(!!applicant, `지원자를 찾을 수 없어요: ${schedule.name}`);
          return (
            <MonthlyScheduleItem applicant={applicant} key={schedule.id} schedule={schedule} />
          );
        })}
        {schedules.length > 3 && !showAllSchedules && (
          <button
            className="ease-ease h-7 cursor-pointer rounded-lg px-1.5 text-left text-xs text-[#8b95a1] transition-colors hover:bg-[rgba(2,32,71,0.05)]"
            onClick={() => setShowAllSchedules(true)}
          >
            + {schedules.length - 3}개 더보기
          </button>
        )}
      </div>
    </div>
  );
};
