import { IcClockLine } from '@yourssu/design-system-react';
import { IcArrowsChevronDownFilled } from '@yourssu/design-system-react';
import { addMinutes, setHours, setMinutes } from 'date-fns';
import { DropdownMenu } from 'radix-ui';
import { useEffect, useState } from 'react';

import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import {
  StyledContent,
  StyledItem,
  StyledItemsContainer,
  StyledItemText,
} from '@/components/CalendarDialog/DateField.style';
import { formatTemplates } from '@/utils/date';
import { DateFormatTemplateNames } from '@/utils/date';

interface MiniTimeFieldProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
}

export const MiniTimeField = ({ date, onDateChange }: MiniTimeFieldProps) => {
  const formatKey: DateFormatTemplateNames = '오전 12:00';
  const [time, setTime] = useState(() => formatTemplates[formatKey](date));

  useEffect(() => {
    const newFormat = formatTemplates[formatKey](date);
    setTime(newFormat);
  }, [date]);

  const handleSelect = (timeValue: Date) => {
    const newDate = setMinutes(setHours(date, timeValue.getHours()), timeValue.getMinutes());
    onDateChange(newDate);
  };

  const timeOptions = [];
  let currentTime = setHours(setMinutes(date, 0), 9);
  const end = setHours(setMinutes(date, 0), 22);
  while (currentTime <= end) {
    timeOptions.push({
      label: formatTemplates[formatKey](currentTime),
      value: currentTime,
    });
    currentTime = addMinutes(currentTime, 30);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MiniDateFieldContainer>
          <IcClockLine color="#6E7687" height={24} width={24} />
          {time}
          <IcArrowsChevronDownFilled color="#6E7687" height={15} width={15} />
        </MiniDateFieldContainer>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <StyledContent align="start" sideOffset={5}>
          <StyledItemsContainer>
            {timeOptions.map((timeOptions) => (
              <StyledItem key={timeOptions.label} onClick={() => handleSelect(timeOptions.value)}>
                <StyledItemText>{timeOptions.label}</StyledItemText>
              </StyledItem>
            ))}
          </StyledItemsContainer>
        </StyledContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
