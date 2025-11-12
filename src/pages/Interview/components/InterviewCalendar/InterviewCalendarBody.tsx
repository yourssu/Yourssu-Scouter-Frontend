import { isSameDay, parseISO } from 'date-fns';
import { range } from 'es-toolkit';

import type { Schedule } from '@/query/schedule/schema';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';
import { InterviewScheduleBlock } from '@/pages/Interview/components/InterviewScheduleBlock';

interface InterviewCalendarBodyProps {
  month: number;
  partId: null | number;
  schedules: Schedule[];
  week: number;
  year: number;
}

export const InterviewCalendarBody = ({
  month,
  week,
  year,
  schedules,
}: InterviewCalendarBodyProps) => {
  const weekDates = useCalendarWeekDates({ month, week, year });

  const availableTimes = range(9 * 60, 22 * 60, 30).map((v) => ({
    hour: Math.floor(v / 60).toString(),
    minute: (v % 60).toString().padStart(2, '0'),
  }));

  const getSchedulesForCell = (date: Date, hour: string, minute: string) => {
    const targetTotalMinutes = Number(hour) * 60 + Number(minute);

    return schedules
      .filter((schedule) => isSameDay(schedule.startTime, date))
      .map((schedule) => {
        const { startTime, endTime } = schedule;
        const start = parseISO(startTime);
        const end = parseISO(endTime);
        const startHour = start.getHours();
        const startMinute = start.getMinutes();
        const endHour = end.getHours();
        const endMinute = end.getMinutes();
        const isFirstBlock = Number(hour) === startHour && Number(minute) === startMinute;
        return {
          startHour,
          startMinute,
          endHour,
          endMinute,
          isFirstBlock,
          ...schedule,
        };
      })
      .filter((schedule) => {
        const startTotalMinutes = schedule.startHour * 60 + schedule.startMinute;
        const endTotalMinutes = schedule.endHour * 60 + schedule.endMinute;
        return startTotalMinutes <= targetTotalMinutes && targetTotalMinutes < endTotalMinutes;
      });
  };

  return (
    <tbody>
      {availableTimes.map(({ hour, minute }) => (
        <tr key={`${hour}:${minute}`}>
          <td className="border-line-basicMedium h-14">
            <div className="typo-c2_sb_12 text-text-basicTertiary size-full px-2.5 py-[5px] text-right">
              {minute === '00' && `${hour} : ${minute}`}
            </div>
          </td>

          {weekDates.map((date, dayIndex) => (
            <td
              className="border-line-basicMedium h-14 border p-1"
              key={`${hour}:${minute}:${dayIndex}`}
            >
              <div className="flex size-full items-center gap-1">
                {getSchedulesForCell(date, hour, minute).map((schedule) => (
                  <InterviewScheduleBlock
                    isFirstBlock={schedule.isFirstBlock}
                    key={`${schedule.id}-${hour}:${minute}`}
                    schedule={schedule}
                  />
                ))}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
