import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';
import { formatTemplates } from '@/components/CalendarDialog/date';
import { IcCalenderLine, IcClockLine } from '@yourssu/design-system-react';

type MiniDateFieldVariants = 'date' | 'time';

interface DateFieldProps {
  date: Date;
  variant: MiniDateFieldVariants;
}

const variantConfig = {
  date: {
    icon: IcCalenderLine,
    formatKey: '01/01(월)',
  },
  time: {
    icon: IcClockLine,
    formatKey: '오전 12:00',
  },
} as const;

export const MiniDateField = ({ date, variant }: DateFieldProps) => {
  const { icon: IconComponent, formatKey } = variantConfig[variant];
  const format = formatTemplates[formatKey](date);

  return (
    <MiniDateFieldContainer>
      <IconComponent width={24} height={24} color="#6E7687" />
      <span>{format}</span>
    </MiniDateFieldContainer>
  );
};
