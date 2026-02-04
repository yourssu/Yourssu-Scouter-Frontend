import clsx from 'clsx';
import { addMinutes, getHours, getMonth, getWeekOfMonth, getYear } from 'date-fns';
import { range } from 'es-toolkit';
import { useMemo } from 'react';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';
import { useDateMap } from '@/hooks/useDateMap';
import { useInterviewAutoScheduleContext } from '@/pages/Interview/context';
import { AutoSchedule } from '@/query/schedule/schema';

interface AutoScheduleThumbnailProps {
  schedules: AutoSchedule[];
}

export const AutoScheduleThumbnail = ({ schedules }: AutoScheduleThumbnailProps) => {
  const { duration } = useInterviewAutoScheduleContext();
  const sortedSchedules = schedules
    .toSorted((a, b) => getHours(a.startTime) - getHours(b.startTime))
    .filter(({ startTime }) => getHours(startTime) >= 9 && getHours(startTime) <= 22);

  const [map] = useDateMap({
    initialEntries: sortedSchedules.map((v) => [new Date(v.startTime), v]),
    precision: duration === '1시간' ? '시간' : '분',
  });

  const weekDates = useCalendarWeekDates({
    month: getMonth(sortedSchedules[0].startTime) + 1,
    week: getWeekOfMonth(sortedSchedules[0].startTime) - 1,
    year: getYear(sortedSchedules[0].startTime),
  });

  const hourRange = useMemo(() => {
    const lowerBoundTime = sortedSchedules[0].startTime;
    const upperBoundTime = sortedSchedules[sortedSchedules.length - 1].endTime;
    const padding = 1;
    const startHour = getHours(lowerBoundTime) - padding - 1;
    const endHour = getHours(upperBoundTime) + padding + 1;
    return {
      startHour: Math.max(9, startHour),
      endHour: startHour > endHour ? 22 : Math.min(endHour, 22),
    };
  }, [sortedSchedules]);

  return (
    <div className="border-line-basicMedium grid w-full grid-cols-7 gap-0.5 rounded-xl border bg-white">
      {range(hourRange.startHour * 60, hourRange.endHour * 60, 30).map((minutes) => {
        return weekDates.map((date) => {
          const targetDate = addMinutes(date, minutes);
          const schedule = map.get(targetDate);
          return (
            <div className="h-5 w-full" key={targetDate.toISOString()}>
              <div className={clsx('size-full', !!schedule && 'bg-bg-brandPrimary rounded-xs')} />
            </div>
          );
        });
      })}
    </div>
  );
};
