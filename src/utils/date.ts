import { addDays, DateArg, endOfMonth, endOfWeek, isBefore, startOfWeek } from 'date-fns';
import { formatWithOptions } from 'date-fns/fp';
import { enUS, ko } from 'date-fns/locale';

const formatKo = formatWithOptions({ locale: ko });
const formatEn = formatWithOptions({ locale: enUS });

export const formatTemplates = {
  '01/01(월) 00:00': formatKo('MM/dd(E) HH:mm'),
  '01/01(월)': formatKo('MM/dd(E)'),
  '2025년 1월': formatKo('yyyy년 M월'),
  '오전 12:00': formatKo('aaaa h:mm'),
  'Mon 12': formatEn('EEE dd'),
  '23:59': formatKo('HH:mm'),
};

export type DateFormatTemplateNames = keyof typeof formatTemplates;

export const generateCalendarDates = (currentDate: { month: number; year: number }): Date[] => {
  const firstDayOfMonth = new Date(currentDate.year, currentDate.month, 1);
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  const firstDayOfView = startOfWeek(firstDayOfMonth);
  const lastDayOfView = endOfWeek(lastDayOfMonth);

  const dates: Date[] = [];
  let tempDate = firstDayOfView;
  while (tempDate <= lastDayOfView) {
    dates.push(tempDate);
    tempDate = addDays(tempDate, 1);
  }
  return dates;
};

export const isInRange = (
  target: DateArg<Date>,
  {
    from,
    to,
  }: {
    from: DateArg<Date>;
    to: DateArg<Date>;
  },
) => {
  return isBefore(from, target) && isBefore(target, to);
};
