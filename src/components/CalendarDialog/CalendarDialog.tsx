import { BoxButton, IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useEffect, useState } from 'react';
import { DateCell } from './DateCell';
import { MiniDateField } from './MiniDateField';

import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns';
import { ko } from 'date-fns/locale';

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

export const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
export const formatDate = (date: Date): string => {
  return format(date, 'MMM do(E) HH:mm', { locale: ko });
}

interface CalendarDialogProps {
  onSelect: (date: Date) => void;
  trigger: React.ReactNode;
  selectedDate?: Date;
}

export const CalendarDialog = ({
  onSelect,
  trigger,
  selectedDate = undefined,
}: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);

  // 다이얼로그가 열릴 때 현재 날짜로 초기화
  useEffect(() => {
    if (open) {
      setCurrentDate(new Date());
    }
  }, [open]);

  const handleSelectDate = (date: Date) => {
    onSelect(date);
    setOpen(false);
  };

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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
          <p>선택된 날짜: {selectedDate ? formatDate(selectedDate) : '없음'}</p>
          <StyledTitle>날짜 선택</StyledTitle>

          <CalendarDialogContainer>
            <CalendarContainer>
              <CalendarHeader>
                <IcArrowsChevronLeftLine
                  width={20}
                  height={20}
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                />
                <CalendarHeaderText>
                  {year}년 {(month + 1).toString().padStart(2, '0')}월
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
                    <DayCell key={day}>
                      {day}
                    </DayCell>
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
              <MiniDateField date={selectedDate ?? today} icon='IcCalendarLine' />
              <MiniDateField date={selectedDate ?? today} icon='IcClockLine' />
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
