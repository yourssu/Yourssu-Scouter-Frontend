import { addDays } from 'date-fns';
import { useMemo } from 'react';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';
import { Applicant } from '@/query/applicant/schema';
import { isInRange } from '@/utils/date';

interface AvailableTimesHeaderChipGroupProps {
  applicants: Applicant[];
  month: number;
  week: number;
  year: number;
}

export const AvailableTimesHeaderChipGroup = ({
  applicants,
  month,
  week,
  year,
}: AvailableTimesHeaderChipGroupProps) => {
  const weekDates = useCalendarWeekDates({ year, month, week });
  const startOfWeekDates = weekDates[0];
  const endOfWeekDates = weekDates[weekDates.length - 1];
  const availableTimesOfApplicants = useMemo(
    () =>
      applicants
        .map(({ availableTimes, ...applicant }) => ({
          ...applicant,
          availableTimes: availableTimes.filter((availableTime) =>
            isInRange(availableTime, {
              from: startOfWeekDates,
              to: addDays(endOfWeekDates, 1),
            }),
          ),
        }))
        .filter(({ availableTimes }) => availableTimes.length > 0),
    [applicants, startOfWeekDates, endOfWeekDates],
  );

  return (
    <div className="flex items-center gap-6">
      <div className="typo-b1_sb_16 text-text-basicSecondary">지원자</div>
      <div className="flex flex-wrap items-center gap-2">
        {availableTimesOfApplicants.map(({ name }) => (
          <div
            className="typo-b2_rg_15 text-text-basicSecondary bg-chipUnselected rounded-full px-3 py-1.5"
            key={name}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
