import { getHours, getMinutes, isSameDay } from 'date-fns';

import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { InterviewScheduleBlock } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleBlock';
import { Schedule } from '@/query/schedule/schema';

interface InterviewScheduleCalendarProps {
  month: number;
  schedules: Schedule[];
  week: number;
  year: number;
}

export const InterviewScheduleCalendar = ({
  month,
  schedules,
  week,
  year,
}: InterviewScheduleCalendarProps) => {
  const getSchedulesForCell = (date: Date, hour: number, minute: number) => {
    const targetTotalMinutes = hour * 60 + minute;

    return schedules
      .filter((schedule) => isSameDay(schedule.startTime, date))
      .filter(({ startTime, endTime }) => {
        const startTotalMinutes = getHours(startTime) * 60 + getMinutes(startTime);
        const endTotalMinutes = getHours(endTime) * 60 + getMinutes(endTime);
        return startTotalMinutes <= targetTotalMinutes && targetTotalMinutes < endTotalMinutes;
      })
      .map((schedule) => ({
        isFirstBlock:
          getHours(schedule.startTime) === hour && getMinutes(schedule.startTime) === minute,
        ...schedule,
      }));
  };

  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {({ date, hour, minute }) =>
        getSchedulesForCell(date, hour, minute).map((schedule) => (
          <InterviewScheduleBlock
            isFirstBlock={schedule.isFirstBlock}
            key={`${schedule.id}-${hour}:${minute}`}
            schedule={schedule}
          />
        ))
      }
    </InterviewCalendar>
  );
};
