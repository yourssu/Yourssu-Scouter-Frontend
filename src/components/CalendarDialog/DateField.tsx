import { IcCalenderLine } from '@yourssu/design-system-react';

import { formatTemplates } from '@/components/CalendarDialog/date';
import { DateFieldContainer } from '@/components/CalendarDialog/DateField.style';

interface DateFieldProps {
  date: Date;
}

export const DateField = ({ date }: DateFieldProps) => {
  return (
    <DateFieldContainer>
      <p>{formatTemplates['01/01(월) 00:00'](date)}</p>
      <IcCalenderLine height={20} width={20} />
    </DateFieldContainer>
  );
};
