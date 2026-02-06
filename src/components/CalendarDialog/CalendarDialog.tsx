import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';
import { addHours, addMonths, isSameDay, setHours, setMinutes, startOfHour } from 'date-fns';
import { Popover } from 'radix-ui';
import { useState } from 'react';

import { DateCell } from '@/components/CalendarDialog/DateCell';
import { MiniDateField } from '@/components/CalendarDialog/MiniDateField';
import { MiniTimeField } from '@/components/CalendarDialog/MiniTimeField';
import { generateCalendarDates } from '@/utils/date';

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

export const CalendarDialog = ({ onSelect, trigger, selectedDate }: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const displayDate = selectedDate ?? today;

  const handleDateChange = (date: Date) => {
    if (selectedDate) {
      const selectedHours = selectedDate.getHours();
      const selectedMinutes = selectedDate.getMinutes();
      const updatedDate = setHours(setMinutes(date, selectedMinutes), selectedHours);
      onSelect(updatedDate);
    } else {
      onSelect(getCloseHour(date));
    }
    setOpen(false);
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
        <Popover.Portal>
          <Popover.Content style={{ zIndex: 50 }}>
            <CalendarDialogContainer>
              <CalendarContent onSelect={handleDateChange} selectedDate={selectedDate} />
              <DateFieldWrapper>
                <MiniDateField date={displayDate} />
                <MiniTimeField date={displayDate} onDateChange={handleTimeChange} />
              </DateFieldWrapper>
            </CalendarDialogContainer>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </StyledWrapper>
  );
};

interface CalendarContentProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date | undefined;
}

export const CalendarContent = ({ onSelect, selectedDate }: CalendarContentProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState({
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
      const updatedDate = setHours(
        setMinutes(date, selectedDate.getMinutes()),
        selectedDate.getHours(),
      );
      onSelect(updatedDate);
    } else {
      const now = new Date();
      const nextHour = startOfHour(addHours(now, 1));
      let targetHour = nextHour.getHours();
      if (targetHour < 9 || targetHour > 22) {
        targetHour = 9;
      }
      onSelect(setHours(date, targetHour));
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <IcArrowsChevronLeftLine
          className="cursor-pointer"
          height={20}
          onClick={() => handleMonthChange(-1)}
        />
        <CalendarHeaderText>{`${currentDate.year}년 ${currentDate.month + 1}월`}</CalendarHeaderText>
        <IcArrowsChevronRightLine
          className="cursor-pointer"
          height={20}
          onClick={() => handleMonthChange(1)}
        />
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
  );
};
