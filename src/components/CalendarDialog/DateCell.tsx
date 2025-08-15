import { StyledDateCell } from '@/components/CalendarDialog/DateCell.style';
import { isSameDay } from 'date-fns';

interface CalendarDateProps {
  date: Date;
  isToday: boolean;
  currentMonth: number;
  selectedDate?: Date;
  onClick: () => void;
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
      onClick={handleDateClick}
      disabled={date.getMonth() !== currentMonth}
      isSelected={isSelected}
      isToday={isToday}
    >
      {dateNum}
    </StyledDateCell>
  );
};
