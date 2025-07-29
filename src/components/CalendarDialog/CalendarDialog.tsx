import { DateCell } from '@/components/CalendarDialog/DateCell';
import { MiniDateField } from '@/components/CalendarDialog/MiniDateField';
import { formatTemplates } from '@/components/CalendarDialog/date';
import {
  BoxButton,
  IcArrowsChevronLeftLine,
  IcArrowsChevronRightLine,
} from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useState } from 'react';

import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';

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

export const CalendarDialog = ({
  onSelect,
  trigger,
  selectedDate = undefined,
}: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleSelectDate = (date: Date) => {
    onSelect(date);
    setOpen(false);
  };

  // 현재 달의 첫 날
  const firstDayOfMonth = startOfMonth(currentDate);
  // 달력 뷰의 첫 날
  const firstDayOfView = startOfWeek(firstDayOfMonth);

  // 현재 달의 마지막 날
  const lastDayOfMonth = endOfMonth(currentDate);
  // 달력 뷰의 마지막 날
  const lastDayOfView = endOfWeek(lastDayOfMonth);

  // date 배열
  let dates = [];
  let tempDate = firstDayOfView;
  while (tempDate <= lastDayOfView) {
    dates.push(tempDate);
    tempDate = addDays(tempDate, 1);
  }

  return (
    <StyledWrapper>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div onClick={() => setOpen(true)}>{trigger}</div>
        </Popover.Anchor>
        <StyledContent>
          <p>
            선택된 날짜:{' '}
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
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                />
                <CalendarHeaderText>
                  {formatTemplates['2025년 1월'](currentDate)}
                </CalendarHeaderText>
                <IcArrowsChevronRightLine
                  width={20}
                  height={20}
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
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
                      firstDayOfMonth={firstDayOfMonth}
                      lastDayOfMonth={lastDayOfMonth}
                      selectedDate={selectedDate}
                      onClick={() => handleSelectDate(date)}
                    />
                  ))}
                </DatesWrapper>
              </CalendarBody>
            </CalendarContainer>
            <DateFieldWrapper>
              <MiniDateField
                date={selectedDate ?? today}
                icon="IcCalendarLine"
              />
              <MiniDateField date={selectedDate ?? today} icon="IcClockLine" />
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
