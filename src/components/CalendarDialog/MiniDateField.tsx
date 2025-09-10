import { IcCalenderLine } from '@yourssu/design-system-react';

import { formatTemplates } from '@/utils/date';
import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import { DateFormatTemplateNames } from '@/utils/date';

interface MiniDateFieldProps {
  date: Date;
}

export const MiniDateField = ({ date }: MiniDateFieldProps) => {
  const formatKey: DateFormatTemplateNames = '01/01(월)';
  const format = formatTemplates[formatKey](date);

  return (
    <MiniDateFieldContainer>
      <IcCalenderLine color="#6E7687" height={24} width={24} />
      <span>{format}</span>
    </MiniDateFieldContainer>
  );
};
