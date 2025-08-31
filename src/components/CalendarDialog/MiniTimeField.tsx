import { IcClockLine } from '@yourssu/design-system-react';
import { setHours, setMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

import { formatTemplates } from '@/components/CalendarDialog/date';
import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import { parseTimeInput } from '@/components/CalendarDialog/time';

interface MiniTimeFieldProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
}

export const MiniTimeField = ({ date, onDateChange }: MiniTimeFieldProps) => {
  const formatKey = '오전 12:00';
  const [text, setText] = useState(() => formatTemplates[formatKey](date));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const newFormat = formatTemplates[formatKey](date);
    setText(newFormat);
  }, [date]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsedTime = parseTimeInput(text);
      if (!parsedTime || isNaN(parsedTime.hour) || isNaN(parsedTime.minute)) {
        setIsError(true);
        return;
      }
      const { hour, minute } = parsedTime;
      const newDate = setMinutes(setHours(date, hour), minute);
      onDateChange(newDate);
      const newFormat = formatTemplates[formatKey](newDate);
      setIsError(false);
      setText(newFormat);
    }
  };

  return (
    <MiniDateFieldContainer $isError={isError}>
      <IcClockLine color="#6E7687" height={24} width={24} />
      <input onChange={handleTextChange} onKeyDown={handleKeyDown} value={text} />
    </MiniDateFieldContainer>
  );
};
