import { BoxButton } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useState, useEffect } from 'react';
import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';
import { DateCell } from './DateCell';
import { MiniDateField } from './MiniDateField';

import {
  CalendarDialogContainer,
  CalendarContainer,
  CalendarHeader,
  CalendarHeaderText,
  DayRow,
  DayCell,
  DatesWrapper,
  DateFieldWrapper,
  StyledWrapper,
  StyledContent,
  StyledTitle,
  ButtonGroup,
  CalendarBody,
} from './CalendarDialog.style';

interface CalendarDialogProps {
  onSelect: (date: string) => void;
  trigger: React.ReactNode;
  selectedDate?: string;
}

export const CalendarDialog = ({
  onSelect,
  trigger,
  selectedDate = '',
}: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);

  // 다이얼로그가 열릴 때 현재 날짜로 초기화
  useEffect(() => {
    if (open) {
      setCurrentDate(new Date());
    }
  }, [open]);

  const handleSelectDate = (date: string) => {
    onSelect(date);
    setOpen(false);
  };

  const getFormattedDate = (target: Date): string => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = String(target.getMonth() + 1).padStart(2, '0');
    const date = String(target.getDate()).padStart(2, '0');
    const day = days[target.getDay()];
    const hours = String(target.getHours()).padStart(2, '0');
    const minutes = String(target.getMinutes()).padStart(2, '0');

    return `${month}/${date}(${day}) ${hours}:${minutes}`;
  };

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 현재 달의 첫 날
  const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1);
  // 달력 뷰의 첫 날
  const firstDayOfView = new Date(firstDayOfMonth);
  firstDayOfView.setDate(firstDayOfView.getDate() - firstDayOfMonth.getDay());

  // 현재 달의 마지막 날
  const lastDayOfMonth = new Date(currentDate.getFullYear(), month + 1, 0);
  // 달력 뷰의 마지막 날
  const lastDayOfView = new Date(lastDayOfMonth);
  lastDayOfView.setDate(lastDayOfView.getDate() + (6 - lastDayOfMonth.getDay()));

  // day 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // date 배열
  const dates = [];
  for (let d = firstDayOfView; d <= lastDayOfView; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  return (
    <StyledWrapper>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div onClick={() => setOpen(true)}>{trigger}</div>
        </Popover.Anchor>
        <StyledContent>
          <p>선택된 날짜: {selectedDate || '없음'}</p>
          <StyledTitle>날짜 선택</StyledTitle>

          <CalendarDialogContainer>
            <CalendarContainer>
              <CalendarHeader>
                <IcArrowsChevronLeftLine
                  width={20}
                  height={20}
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                />
                <CalendarHeaderText>
                  {year}년 {(month + 1).toString().padStart(2, '0')}월
                </CalendarHeaderText>
                <IcArrowsChevronRightLine
                  width={20}
                  height={20}
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
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
                      date={getFormattedDate(date)}
                      today={getFormattedDate(today)}
                      firstDayOfMonth={getFormattedDate(firstDayOfMonth)}
                      lastDayOfMonth={getFormattedDate(lastDayOfMonth)}
                      selectedDate={selectedDate}
                      onClick={() => handleSelectDate(getFormattedDate(date))}
                    />
                  ))}
                </DatesWrapper>
              </CalendarBody>
            </CalendarContainer>
            <DateFieldWrapper>
              <MiniDateField date={selectedDate.slice(0,9)} icon='IcCalendarLine' />
              <MiniDateField date={selectedDate.slice(9)} icon='IcClockLine' />
            </DateFieldWrapper>
          </CalendarDialogContainer>

          <ButtonGroup>
            <BoxButton
              size="small"
              variant="filledPrimary"
              onClick={() => handleSelectDate(getFormattedDate(today))}
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
