import { BoxButton } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useState } from 'react';
import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';
import {
  CalendarDialogContainer,
  CalendarContainer, 
  CalendarHeader, 
  CalendarHeaderText, 
  DayRow,
  DayCell,
  DateCell,
  WeekRow,
  StyledWrapper, 
  StyledContent, 
  StyledTitle, 
  ButtonGroup,
  CalendarBody,
} from '../VariableCard/CalendarDialog.style';

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

  const handleSelectDate = (date: string) => {
    onSelect(date);
    setOpen(false);
  };

  // 오늘 날짜를 MM/DD(요일) HH:MM 형식으로 반환
  const getTodayFormatted = () => {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const day = days[now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

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
  // 주 단위로 묶기
  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <StyledWrapper>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div onClick={() => setOpen(true)}>{trigger}</div>
        </Popover.Anchor>
        <StyledContent>
          <StyledTitle>날짜 선택</StyledTitle>
          <p>선택된 날짜: {selectedDate || '없음'}</p>

          <CalendarDialogContainer $width={366}>
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
              {weeks.map((week, index) => (
                  <WeekRow key={index}>
                    {week.map((date, idx) => (
                      <DateCell 
                        key={idx}
                        onClick={() => handleSelectDate(date.toLocaleDateString())}
                        >{date.getDate()}</DateCell>
                    ))}
                  </WeekRow>
              ))}
            </CalendarBody>
          </CalendarContainer>
          </CalendarDialogContainer>

          <ButtonGroup>
            <BoxButton
              size="small"
              variant="filledPrimary"
              onClick={() => handleSelectDate(getTodayFormatted())}
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
