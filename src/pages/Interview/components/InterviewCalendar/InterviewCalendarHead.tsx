import { tv } from 'tailwind-variants';

import { useCalendarWeekDates } from '@/pages/Interview/hooks/useCalendarWeekDates';
import { formatTemplates } from '@/utils/date';

interface InterviewCalendarHeadProps {
  month: number;
  week: number;
  year: number;
}

const cell = tv({
  base: 'border-line-basicMedium typo-b1_rg_16 text-text-basicTertiary min-w-[150px] flex-[1_1] items-center justify-center border py-2.5 first:min-w-[72px]',
});

export const InterviewCalendarHead = ({ month, week, year }: InterviewCalendarHeadProps) => {
  const cellStyle = cell();
  const weekDates = useCalendarWeekDates({
    month,
    week,
    year,
  }).map((v) => formatTemplates['Mon 12'](v).split(' '));

  return (
    <thead>
      <tr>
        <th className={cellStyle}>TIME</th>
        {weekDates.map(([dayName, day]) => (
          <th className={cellStyle} key={`${dayName}${day}`}>
            <div className="flex items-center justify-center gap-[7px]">
              <div>{dayName}</div>
              <div className="typo-b1_sb_16 text-text-basicPrimary">{day}</div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
