import { IcCalenderLine } from '@yourssu/design-system-react';
import { formatTemplates } from './date';
import { DateFieldContainer } from './DateField.style';

interface DateFieldProps {
  date: Date;
}

export const DateField = ({ date }: DateFieldProps) => {
  return (
    <DateFieldContainer>
      <p>{formatTemplates['01/01(월) 00:00'](date)}</p>
      <IcCalenderLine width={20} height={20} />
    </DateFieldContainer>
  );
};
