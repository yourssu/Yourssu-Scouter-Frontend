import { isSameDay } from 'date-fns';
import { StyledDateCell } from './DateCell.style';

interface CalendarDateProps {
  date: Date;
  today: Date;
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  selectedDate?: Date;
  onClick: () => void;
}

export const DateCell = ({
  date,
  today,
  firstDayOfMonth,
  lastDayOfMonth,
  selectedDate = undefined,
  onClick: handleDateClick,
}: CalendarDateProps) => {
  const dateNum = date.getDate();
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
  const isToday = isSameDay(date, today);

  return (
    <StyledDateCell
      onClick={handleDateClick}
      disabled={date < firstDayOfMonth || date > lastDayOfMonth}
      isSelected={isSelected}
      isToday={isToday}
    >
      {dateNum}
    </StyledDateCell>
  );
};
