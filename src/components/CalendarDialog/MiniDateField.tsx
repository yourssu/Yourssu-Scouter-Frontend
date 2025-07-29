import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import { formatTemplates } from '@/components/CalendarDialog/date';
import { IcCalenderLine, IcClockLine } from '@yourssu/design-system-react';

const iconMap = {
  IcCalendarLine: IcCalenderLine,
  IcClockLine: IcClockLine,
};

interface DateFieldProps {
  date: Date;
  icon: keyof typeof iconMap;
}

export const MiniDateField = ({
  date,
  icon = 'IcCalendarLine',
}: DateFieldProps) => {
  const IconComponent = iconMap[icon];

  const getDateFieldString = () => {
    if (icon == 'IcClockLine' && date) {
      return formatTemplates['오전 12:00'](date);
    } else {
      return formatTemplates['01/01(월)'](date);
    }
  };

  return (
    <MiniDateFieldContainer>
      <IconComponent width={24} height={24} color="#6E7687" />
      <span>{getDateFieldString()}</span>
    </MiniDateFieldContainer>
  );
};
