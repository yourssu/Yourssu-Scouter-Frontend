import {
  BoxButton,
  IcArrowsChevronLeftLine,
  IcArrowsChevronRightLine,
} from '@yourssu/design-system-react';
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
  const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate); // 내부에서만 사용하는 임시 날짜 상태
  const today = new Date();
  const displayDate = tempDate ?? selectedDate ?? today;

  // 팝업이 열릴 때마다 임시 상태를 현재 선택된 값으로 초기화 (취소 후 재진입 대비)
  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setTempDate(selectedDate);
    }
    setOpen(nextOpen);
  };

  const handleDateChange = (date: Date) => {
    if (tempDate) {
      const selectedHours = tempDate.getHours();
      const selectedMinutes = tempDate.getMinutes();
      const updatedDate = setHours(setMinutes(date, selectedMinutes), selectedHours);
      setTempDate(updatedDate);
    } else {
      setTempDate(getCloseHour(date));
    }
  };

  const handleTimeChange = (date: Date) => {
    setTempDate(date);
  };

  // 확인 버튼을 눌렀을 때만 부모의 onSelect 호출
  const handleConfirm = () => {
    if (tempDate) {
      onSelect(tempDate);
      setOpen(false);
    }
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
      <Popover.Root onOpenChange={handleOpenChange} open={open}>
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content style={{ zIndex: 50 }}>
            <CalendarDialogContainer>
              <CalendarContent onSelect={handleDateChange} selectedDate={tempDate} />
              <DateFieldWrapper>
                <MiniDateField date={displayDate} />
                <MiniTimeField date={displayDate} onDateChange={handleTimeChange} />
              </DateFieldWrapper>
              <BoxButton
                className="w-full"
                disabled={!tempDate} // 임시 선택된 값이 없으면 비활성화
                onClick={handleConfirm}
                size="large"
                variant="filledPrimary"
              >
                확인
              </BoxButton>
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
