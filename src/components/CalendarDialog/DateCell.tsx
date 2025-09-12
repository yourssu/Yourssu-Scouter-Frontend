import { isSameDay } from 'date-fns';

import { StyledDateCell } from '@/components/CalendarDialog/DateCell.style';

interface CalendarDateProps {
  currentMonth: number;
  date: Date;
  isToday: boolean;
  onClick: () => void;
  selectedDate?: Date;
}

export const DateCell = ({
  date,
  isToday,
  currentMonth,
  selectedDate,
  onClick: handleDateClick,
}: CalendarDateProps) => {
  const dateNum = date.getDate();
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

  return (
    <StyledDateCell
      disabled={date.getMonth() !== currentMonth}
      isSelected={isSelected}
      isToday={isToday}
      onClick={handleDateClick}
    >
      {dateNum}
    </StyledDateCell>
  );
};
