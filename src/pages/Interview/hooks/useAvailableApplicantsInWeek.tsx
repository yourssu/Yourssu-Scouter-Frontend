import { addDays } from 'date-fns';
import { useCallback, useMemo } from 'react';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';
import { Applicant } from '@/query/applicant/schema';
import { isInRange } from '@/utils/date';

interface UseAvailableApplicantsInWeekProps {
  applicants: Applicant[];
  month: number;
  week: number;
  year: number;
}

export const useAvailableApplicantsInWeek = ({
  year,
  month,
  week,
  applicants,
}: UseAvailableApplicantsInWeekProps) => {
  const weekDates = useCalendarWeekDates({ year, month, week });
  const startOfWeekDates = weekDates[0];
  const endOfWeekDates = weekDates[weekDates.length - 1];

  const pickAvailableTimesInWeek = useCallback(
    (availableTimes: string[]) =>
      availableTimes.filter((availableTime) =>
        isInRange(availableTime, {
          from: startOfWeekDates,
          to: addDays(endOfWeekDates, 1),
        }),
      ),
    [startOfWeekDates, endOfWeekDates],
  );

  return useMemo(
    () =>
      applicants
        .map(({ availableTimes, ...applicant }) => ({
          ...applicant,
          availableTimes: pickAvailableTimesInWeek(availableTimes),
        }))
        .filter(({ availableTimes }) => availableTimes.length > 0),
    [applicants, pickAvailableTimesInWeek],
  );
};
