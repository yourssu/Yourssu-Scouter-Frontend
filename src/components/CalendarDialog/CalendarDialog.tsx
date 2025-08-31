import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';
import {
  addDays,
  addHours,
  endOfMonth,
  endOfWeek,
  isSameDay,
  setHours,
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

export const CalendarDialog = ({
  onSelect,
  trigger,
  selectedDate = new Date(),
}: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<{
    month: number;
    year: number;
  }>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = generateCalendarDates(currentDate);

  const handleSelectDate = (date: Date) => {
    onSelect(date);
  };

  const getCloseHour = (date: Date) => {
    const now = new Date();
    const nextHour = startOfHour(addHours(now, 1));
    return setHours(date, nextHour.getHours());
  };

  return (
    <StyledWrapper>
      <Popover.Root onOpenChange={setOpen} open={open}>
        <Popover.Trigger asChild>
          <div>{trigger}</div>
        </Popover.Trigger>
        <Popover.Content>
          <CalendarDialogContainer>
            <CalendarContainer>
              <CalendarHeader>
                <IcArrowsChevronLeftLine
                  height={20}
                  onClick={() =>
                    setCurrentDate((currentDate) => ({
                      year: currentDate.year,
                      month: currentDate.month - 1,
                    }))
                  }
                  width={20}
                />
                <CalendarHeaderText>
                  {`${currentDate.year}년 ${currentDate.month + 1}월`}
                </CalendarHeaderText>
                <IcArrowsChevronRightLine
                  height={20}
                  onClick={() =>
                    setCurrentDate((currentDate) => ({
                      year: currentDate.year,
                      month: currentDate.month + 1,
                    }))
                  }
                  width={20}
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
                      onClick={() => handleSelectDate(getCloseHour(date))}
                      selectedDate={selectedDate}
                    />
                  ))}
                </DatesWrapper>
              </CalendarBody>
            </CalendarContainer>
            <DateFieldWrapper>
              <MiniDateField date={selectedDate} />
              <MiniTimeField date={selectedDate} onDateChange={handleSelectDate} />
            </DateFieldWrapper>
          </CalendarDialogContainer>
        </Popover.Content>
      </Popover.Root>
    </StyledWrapper>
  );
};
