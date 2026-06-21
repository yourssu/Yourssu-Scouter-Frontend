import clsx from 'clsx';
import { isSameDay, isToday } from 'date-fns';
import { type ReactNode } from 'react';

import {
  useWeeklyCalendarLayoutContext,
  WeeklyCalendarLayoutContext,
} from '@/pages/NewInterview/components/WeeklyCalendarLayout/context';
import {
  hourHeight,
  hours,
  startHour,
} from '@/pages/NewInterview/components/WeeklyCalendarLayout/type';
import { generateWeeklyCalendarDates } from '@/pages/NewInterview/utils/calendar';
import { formatTemplates } from '@/utils/date';

const WeeklyCalendarHeader = ({ top = 96 }: { top?: number }) => {
  const { displayDates } = useWeeklyCalendarLayoutContext();

  return (
    <div className="sticky z-30 flex w-full" style={{ top }}>
      <div className="w-15 shrink-0 bg-[#ffffff]" />
      <div className="calendar-header-lighting-gradient flex flex-1">
        {displayDates.map((d) => (
          <div
            className="flex flex-1 flex-col items-center justify-center border-b border-l border-b-[#e5e8eb] border-l-[#ffffff] bg-[#ffffff] py-2"
            key={d.toISOString()}
          >
            <span
              className={clsx(
                'text-15 font-medium text-[#4e5968] select-none',
                isToday(d) && 'text-[#5b4dff]',
              )}
            >
              {formatTemplates['1.1 (월)'](d)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeeklyCalendarTimeColumn = () => {
  return (
    <div className="w-15 shrink-0 pt-2">
      {hours.map((hour) => (
        <div
          className="flex items-start justify-center text-xs text-[#6b7684] select-none"
          key={hour}
          style={{ height: hourHeight }}
        >
          <span className="-mt-2 px-1">{hour > 12 ? `오후 ${hour - 12}시` : `오전 ${hour}시`}</span>
        </div>
      ))}
    </div>
  );
};

const WeeklyCalendarDayColumn = ({
  date,
  children,
}: {
  children: (date: Date) => ReactNode;
  date: Date;
}) => {
  const dimmed = isToday(date);

  return (
    <div
      className="relative flex-1 border-b border-[#e5e8eb] pt-2 first:*:border-l-0"
      style={{ height: hours.length * hourHeight + 8 }}
    >
      {hours.map((hour) => (
        <div
          className={clsx(
            'absolute w-full border-b border-l border-[#e5e8eb]',
            dimmed && 'bg-[rgba(0,23,51,0.02)]',
          )}
          key={hour}
          style={{
            top: (hour - startHour) * hourHeight + 8,
            height: hourHeight,
          }}
        >
          <div className="h-1/2 w-full border-b border-[#f2f4f6]" />
        </div>
      ))}
      {children(date)}
    </div>
  );
};

const WeeklyCalendarBody = ({
  children,
  indicator,
}: {
  children: (date: Date) => React.ReactNode;
  indicator?: React.ReactNode;
}) => {
  const { displayDates } = useWeeklyCalendarLayoutContext();

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto">
      <div className="flex flex-1">
        <WeeklyCalendarTimeColumn />
        {displayDates.map((d) => (
          <WeeklyCalendarDayColumn date={d} key={d.toISOString()}>
            {children}
          </WeeklyCalendarDayColumn>
        ))}
      </div>
      <div className="h-6 w-full" />
      {indicator}
    </div>
  );
};

export const WeeklyCalendarLayout = ({
  displayDate,
  filteredDates,
  children,
}: React.PropsWithChildren<{
  displayDate: Date;
  filteredDates?: Date[];
}>) => {
  const weekDates = generateWeeklyCalendarDates(displayDate);
  const displayDates = filteredDates
    ? weekDates.filter((d) => filteredDates.some((fd) => isSameDay(fd, d)))
    : weekDates;

  return (
    <WeeklyCalendarLayoutContext.Provider value={{ displayDates }}>
      <div className="flex w-full flex-col">{children}</div>
    </WeeklyCalendarLayoutContext.Provider>
  );
};

WeeklyCalendarLayout.Header = WeeklyCalendarHeader;
WeeklyCalendarLayout.Body = WeeklyCalendarBody;
