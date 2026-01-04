import clsx from 'clsx';
import { addMinutes, compareAsc, getHours, getMonth, getWeek, getYear } from 'date-fns';
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
  const sortedSchedules = schedules.toSorted((a, b) => compareAsc(a.startTime, b.startTime));

  const [map] = useDateMap({
    initialEntries: sortedSchedules.map((v) => [new Date(v.startTime), v]),
    precision: duration === '1시간' ? '시간' : '분',
  });

  const weekDates = useCalendarWeekDates({
    month: getMonth(sortedSchedules[0].startTime) + 1,
    week: getWeek(sortedSchedules[0].startTime) - 1,
    year: getYear(sortedSchedules[0].startTime),
  });

  const hourRange = useMemo(() => {
    const lowerBoundTime = sortedSchedules[0].startTime;
    const upperBoundTime = sortedSchedules[sortedSchedules.length - 1].endTime;
    const padding = 1;
    return {
      startHour: getHours(lowerBoundTime) - padding,
      endHour: getHours(upperBoundTime) + padding + 1,
    };
  }, [sortedSchedules]);

  return (
    <div className="border-line-basicMedium grid w-full grid-cols-7 gap-0.5 rounded-xl border bg-white">
      {range(hourRange.startHour * 60, hourRange.endHour * 60, 30).map((minutes) => {
        return weekDates.map((date) => {
          const targetDate = addMinutes(date, minutes);
          const schedule = map.get(targetDate);
          return (
            <div className="h-5 w-full">
              <div className={clsx('size-full', !!schedule && 'bg-bg-brandPrimary rounded-xs')} />
            </div>
          );
        });
      })}
    </div>
  );
};
