import { compareAsc, getMonth, getYear, isSameDay } from 'date-fns';

import { MonthlyCalendarDayCell } from '@/pages/NewInterview/components/MonthlyCalendar/MonthlyCalendarDayCell';
import { generateMonthlyCalendarDates } from '@/pages/NewInterview/utils/calendar';
import { Applicant } from '@/query/applicant/schema';
import { Schedule } from '@/query/schedule/schema';

interface MonthlyCalendarGridProps {
  applicants: Applicant[];
  date: Date;
  schedules: Schedule[];
}

export const MonthlyCalendarGrid = ({ applicants, date, schedules }: MonthlyCalendarGridProps) => {
  const year = getYear(date);
  const month = getMonth(date);
  const weeks = generateMonthlyCalendarDates(year, month);

  const getDateSchedules = (date: Date) =>
    schedules
      .filter(({ startTime }) => isSameDay(startTime, date))
      .toSorted((a, b) => compareAsc(a.startTime, b.startTime));

  return (
    <div className="mt-2 flex w-full flex-col">
      {weeks.map((week, weekIndex) => (
        <div className="flex w-full" key={weekIndex}>
          {week.map(({ date, state }) => (
            <MonthlyCalendarDayCell
              applicants={applicants}
              date={date}
              key={date.toISOString()}
              schedules={getDateSchedules(date)}
              state={state}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
