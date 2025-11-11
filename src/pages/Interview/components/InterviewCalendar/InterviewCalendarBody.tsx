import { useQuery } from '@tanstack/react-query';
import { format, isSameDay, parseISO } from 'date-fns';
import { range } from 'es-toolkit';

import type { Schedule } from '@/query/schedule/schema';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';
import { InterviewScheduleBlock } from '@/pages/Interview/components/InterviewScheduleBlock';
import { scheduleOptions } from '@/query/schedule/options';

interface InterviewCalendarBodyProps {
  month: number;
  partId: null | number;
  week: number;
  year: number;
}

export const InterviewCalendarBody = ({
  month,
  week,
  year,
  partId,
}: InterviewCalendarBodyProps) => {
  const { data: schedules = [] } = useQuery(scheduleOptions(partId));
  const weekDates = useCalendarWeekDates({ month, week, year });

  const availableTimes = range(11 * 60 + 30, 17 * 60, 30).map((v) => ({
    hour: Math.floor(v / 60).toString(),
    minute: (v % 60).toString().padStart(2, '0'),
  }));

  const getSchedulesForCell = (date: Date, hour: string, minute: string): Schedule[] => {
    const cellTime = `${hour.padStart(2, '0')}:${minute}`;
    return schedules.filter((schedule) => {
      const scheduleDate = parseISO(schedule.startTime);
      const scheduleTime = format(scheduleDate, 'HH:mm');
      return isSameDay(scheduleDate, date) && scheduleTime === cellTime;
    });
  };

  return (
    <tbody>
      {availableTimes.map(({ hour, minute }) => {
        return (
          <tr key={`${hour}:${minute}`}>
            <td className="border-line-basicMedium h-14">
              <div className="typo-c2_sb_12 text-text-basicTertiary size-full px-2.5 py-[5px] text-right">
                {minute === '00' && `${hour} : ${minute}`}
              </div>
            </td>
            {weekDates.map((date, dayIndex) => {
              const cellSchedules = getSchedulesForCell(date, hour, minute);
              return (
                <td
                  className="border-line-basicMedium h-14 border p-1"
                  key={`${hour}:${minute}:${dayIndex}`}
                >
                  {cellSchedules.map((schedule) => (
                    <InterviewScheduleBlock key={schedule.id} schedule={schedule} />
                  ))}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
