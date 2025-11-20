import { range } from 'es-toolkit';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';

interface InterviewCalendarBodyProps {
  children: (p: { date: Date; hour: number; minute: number }) => React.ReactNode;
  month: number;
  week: number;
  year: number;
}

export const InterviewCalendarBody = ({
  month,
  week,
  year,
  children,
}: InterviewCalendarBodyProps) => {
  const weekDates = useCalendarWeekDates({ month, week, year });

  const availableTimes = range(9 * 60, 22 * 60, 30).map((v) => ({
    hour: Math.floor(v / 60),
    minute: v % 60,
  }));

  return (
    <tbody>
      {availableTimes.map(({ hour, minute }) => (
        <tr key={`${hour}:${minute}`}>
          <td className="border-line-basicMedium h-14">
            <div className="typo-c2_sb_12 text-text-basicTertiary size-full px-2.5 py-[5px] text-right">
              {minute === 0 && `${hour.toString()} : ${minute.toString().padStart(2, '0')}`}
            </div>
          </td>

          {weekDates.map((date, dayIndex) => (
            <td
              className="border-line-basicMedium h-14 border p-1"
              key={`${hour}:${minute}:${dayIndex}`}
            >
              <div className="flex size-full items-center gap-1">
                {children({ date, hour, minute })}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
