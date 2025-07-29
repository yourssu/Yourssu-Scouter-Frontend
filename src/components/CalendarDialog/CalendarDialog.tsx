import { DateCell } from '@/components/CalendarDialog/DateCell';
import { MiniDateField } from '@/components/CalendarDialog/MiniDateField';
import { formatTemplates } from '@/components/CalendarDialog/date';
import {
  BoxButton,
  IcArrowsChevronLeftLine,
  IcArrowsChevronRightLine,
} from '@yourssu/design-system-react';
import { addDays, endOfMonth, endOfWeek, startOfWeek } from 'date-fns';
import { Popover } from 'radix-ui';
import { useState } from 'react';
import {
  ButtonGroup,
  CalendarBody,
  CalendarContainer,
  CalendarDialogContainer,
  CalendarHeader,
  CalendarHeaderText,
  DateFieldWrapper,
  DatesWrapper,
  DayCell,
  DayRow,
  StyledContent,
  StyledTitle,
  StyledWrapper,
} from './CalendarDialog.style';

interface CalendarDialogProps {
  onSelect: (date: Date) => void;
  trigger: React.ReactNode;
  selectedDate?: Date | undefined;
}

export const generateCalendarDates = (currentDate: {
  year: number;
  month: number;
}): Date[] => {
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
  selectedDate = undefined,
}: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<{
    year: number;
    month: number;
  }>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = generateCalendarDates(currentDate);

  const handleSelectDate = (date: Date) => {
    onSelect(date);
    setOpen(false);
  };

  return (
    <StyledWrapper>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div onClick={() => setOpen(true)}>{trigger}</div>
        </Popover.Anchor>
        <StyledContent>
          <p>
            선택된 날짜:
            {selectedDate
              ? formatTemplates['01/01(월) 00:00'](selectedDate)
              : '없음'}
          </p>
          <StyledTitle>{'날짜 선택'}</StyledTitle>

          <CalendarDialogContainer>
            <CalendarContainer>
              <CalendarHeader>
                <IcArrowsChevronLeftLine
                  width={20}
                  height={20}
                  onClick={() =>
                    setCurrentDate((currentDate) => ({
                      year: currentDate.year,
                      month: currentDate.month - 1,
                    }))
                  }
                />
                <CalendarHeaderText>
                  {`${currentDate.year}년 ${currentDate.month + 1}월`}
                </CalendarHeaderText>
                <IcArrowsChevronRightLine
                  width={20}
                  height={20}
                  onClick={() =>
                    setCurrentDate((currentDate) => ({
                      year: currentDate.year,
                      month: currentDate.month + 1,
                    }))
                  }
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
                      key={date.toLocaleDateString()}
                      date={date}
                      today={today}
                      currentMonth={currentDate.month}
                      selectedDate={selectedDate}
                      onClick={() => handleSelectDate(date)}
                    />
                  ))}
                </DatesWrapper>
              </CalendarBody>
            </CalendarContainer>
            <DateFieldWrapper>
              <MiniDateField date={selectedDate ?? today} variant="date" />
              <MiniDateField date={selectedDate ?? today} variant="time" />
            </DateFieldWrapper>
          </CalendarDialogContainer>

          <ButtonGroup>
            <BoxButton
              size="small"
              variant="filledPrimary"
              onClick={() => handleSelectDate(today)}
            >
              오늘 날짜 선택
            </BoxButton>
            <BoxButton
              size="small"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              닫기
            </BoxButton>
          </ButtonGroup>
        </StyledContent>
      </Popover.Root>
    </StyledWrapper>
  );
};
