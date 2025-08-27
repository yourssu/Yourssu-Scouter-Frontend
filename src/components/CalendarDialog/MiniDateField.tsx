import { IcCalenderLine } from '@yourssu/design-system-react';

import { formatTemplates } from '@/components/CalendarDialog/date';
import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';

interface MiniDateFieldProps {
  date: Date;
}

export const MiniDateField = ({ date }: MiniDateFieldProps) => {
  const formatKey = '01/01(월)';
  const format = formatTemplates[formatKey](date);

  return (
    <MiniDateFieldContainer>
      <IcCalenderLine color="#6E7687" height={24} width={24} />
      <span>{format}</span>
    </MiniDateFieldContainer>
  );
};
