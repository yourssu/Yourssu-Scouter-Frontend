import { IcCalenderLine } from '@yourssu/design-system-react';
import { ComponentProps, forwardRef } from 'react';

import { DateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import { formatTemplates } from '@/utils/date';

interface DateFieldProps extends ComponentProps<'div'> {
  date: Date | undefined;
}

export const DateField = forwardRef<HTMLDivElement, DateFieldProps>(({ date, ...props }, ref) => (
  <DateFieldContainer ref={ref} {...props}>
    <p>{formatTemplates['01/01(월) 00:00'](date ?? new Date())}</p>
    <IcCalenderLine height={20} width={20} />
  </DateFieldContainer>
));

DateField.displayName = 'DateField';
