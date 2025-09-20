import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';
import {
  addDays,
  addHours,
  addMonths,
  endOfMonth,
  endOfWeek,
  isSameDay,
  setHours,
  setMinutes,
  startOfHour,
  startOfWeek,
} from 'date-fns';
import { Popover } from 'radix-ui';
import { useState } from 'react';

import { DateCell } from '@/components/CalendarDialog/DateCell';
import { MiniDateField } from '@/components/CalendarDialog/MiniDateField';
import { MiniTimeField } from '@/components/CalendarDialog/MiniTimeField';

import {
  CalendarBody,
  CalendarContainer,
  CalendarDialogContainer,
  CalendarHeader,
  CalendarHeaderText,
  DateFieldWrapper,
  DatesWrapper,
  DayCell,
  DayRow,
  StyledWrapper,
} from './CalendarDialog.style';

interface CalendarDialogProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date | undefined;
  trigger: React.ReactNode;
}

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

export const CalendarDialog = ({ onSelect, trigger, selectedDate }: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const displayDate = selectedDate ?? today;
  const [currentDate, setCurrentDate] = useState<{
    month: number;
    year: number;
  }>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = generateCalendarDates(currentDate);

  const handleMonthChange = (amount: number) => {
    const newDate = addMonths(new Date(currentDate.year, currentDate.month, 1), amount);
    setCurrentDate({ year: newDate.getFullYear(), month: newDate.getMonth() });
  };

  const handleDateChange = (date: Date) => {
    if (selectedDate) {
      const selectedHours = selectedDate.getHours();
      const selectedMinutes = selectedDate.getMinutes();
      const updatedDate = setHours(setMinutes(date, selectedMinutes), selectedHours);
      onSelect(updatedDate);
    } else {
      onSelect(getCloseHour(date));
    }
  };

  const handleTimeChange = (date: Date) => {
    onSelect(date);
  };

  const getCloseHour = (date: Date) => {
    const now = new Date();
    const nextHour = startOfHour(addHours(now, 1));
    let targetHour = nextHour.getHours();
    if (targetHour < 9 || targetHour > 22) {
      targetHour = 9;
    }
    return setHours(date, targetHour);
  };

  return (
    <StyledWrapper>
      <Popover.Root onOpenChange={setOpen} open={open}>
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
        <Popover.Content>
          <CalendarDialogContainer>
            <CalendarContainer>
              <CalendarHeader>
                <IcArrowsChevronLeftLine height={20} onClick={() => handleMonthChange(-1)} />
                <CalendarHeaderText>
                  {`${currentDate.year}년 ${currentDate.month + 1}월`}
                </CalendarHeaderText>
                <IcArrowsChevronRightLine height={20} onClick={() => handleMonthChange(1)} />
              </CalendarHeader>
              <CalendarBody>
                <DayRow>
                  {weekdays.map((day) => (
                    <DayCell key={day}>{day}</DayCell>
                  ))}
                </DayRow>
                <DatesWrapper>
                  {dates.map((date) => (
                    <DateCell
                      currentMonth={currentDate.month}
                      date={date}
                      isToday={isSameDay(date, today)}
                      key={date.toISOString()}
                      onClick={() => handleDateChange(date)}
                      selectedDate={selectedDate}
                    />
                  ))}
                </DatesWrapper>
              </CalendarBody>
            </CalendarContainer>
            <DateFieldWrapper>
              <MiniDateField date={displayDate} />
              <MiniTimeField date={displayDate} onDateChange={handleTimeChange} />
            </DateFieldWrapper>
          </CalendarDialogContainer>
        </Popover.Content>
      </Popover.Root>
    </StyledWrapper>
  );
};
