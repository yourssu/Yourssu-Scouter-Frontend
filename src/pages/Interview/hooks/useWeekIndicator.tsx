import { DateArg, getMonth, getWeekOfMonth, getYear } from 'date-fns';
import { useState } from 'react';

interface UseWeekIndicatorProps {
  initialDate?: DateArg<Date>;
}

export const useWeekIndicator = ({ initialDate }: UseWeekIndicatorProps = {}) => {
  const currentDate = initialDate ?? new Date();

  const [year, setYear] = useState(getYear(currentDate));
  const [month, setMonth] = useState(getMonth(currentDate) + 1);
  const [week, setWeek] = useState(getWeekOfMonth(currentDate) - 1);

  const handlePrevWeek = () => {
    if (week > 0) {
      setWeek(week - 1);
    } else if (month > 1) {
      setMonth(month - 1);
      setWeek(4);
    } else {
      setYear(year - 1);
      setMonth(12);
      setWeek(4);
    }
  };

  const handleNextWeek = () => {
    if (week < 4) {
      setWeek(week + 1);
    } else if (month < 12) {
      setMonth(month + 1);
      setWeek(0);
    } else {
      setYear(year + 1);
      setMonth(1);
      setWeek(0);
    }
  };

  const jump = (date: DateArg<Date>) => {
    setYear(getYear(date));
    setMonth(getMonth(date) + 1);
    setWeek(getWeekOfMonth(date) - 1);
  };

  return { year, month, week, handlePrevWeek, handleNextWeek, jump };
};
