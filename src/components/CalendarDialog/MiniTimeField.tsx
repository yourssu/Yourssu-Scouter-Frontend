import { IcClockLine } from '@yourssu/design-system-react';
import { setHours, setMinutes } from 'date-fns';

import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import { formatTemplates } from '@/utils/date';
import { DateFormatTemplateNames } from '@/utils/date';

interface MiniTimeFieldProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
}

export const MiniTimeField = ({ date, onDateChange }: MiniTimeFieldProps) => {
  const formatKey: DateFormatTemplateNames = '오전 12:00';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const timeValue = `${hours}:${minutes}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m] = e.target.value.split(':').map(Number);
    onDateChange(setMinutes(setHours(date, h), m));
  };

  return (
    <MiniDateFieldContainer as="label">
      <IcClockLine color="#6E7687" height={24} width={24} />
      {formatTemplates[formatKey](date)}
      <input onChange={handleChange} type="time" value={timeValue} />
    </MiniDateFieldContainer>
  );
};
