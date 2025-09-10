import { IcCalenderLine } from '@yourssu/design-system-react';
import { ComponentProps, forwardRef } from 'react';

import { formatTemplates } from '@/utils/date';
import { DateFieldContainer } from '@/components/CalendarDialog/DateField.style';

interface DateFieldProps extends ComponentProps<'div'> {
  date: Date;
}

export const DateField = forwardRef<HTMLDivElement, DateFieldProps>(({ date, ...props }, ref) => (
  <DateFieldContainer ref={ref} {...props}>
    <p>{formatTemplates['01/01(월) 00:00'](date)}</p>
    <IcCalenderLine height={20} width={20} />
  </DateFieldContainer>
));
