import { generateCalendarDates } from '@/utils/date';

interface UseCalendarWeekDatesProps {
  month: number;
  week: number;
  year: number;
}

export const useCalendarWeekDates = ({ month, week, year }: UseCalendarWeekDatesProps) => {
  const dates = generateCalendarDates({ month: month - 1, year });
  return dates.slice(week * 7, (week + 1) * 7);
};
