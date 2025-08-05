import { StyledDateCell } from '@/components/CalendarDialog/DateCell.style';
import { isSameDay } from 'date-fns';

interface CalendarDateProps {
  date: Date;
  today: Date;
  currentMonth: number;
  selectedDate?: Date;
  onClick: () => void;
}

export const DateCell = ({
  date,
  today,
  currentMonth,
  selectedDate = undefined,
  onClick: handleDateClick,
}: CalendarDateProps) => {
  const dateNum = date.getDate();
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
  const isToday = isSameDay(date, today);

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
