import { IcCalenderLine, IcClockLine } from '@yourssu/design-system-react';
import { useState } from 'react';

import { formatTemplates } from '@/components/CalendarDialog/date';
import { MiniDateFieldContainer } from '@/components/CalendarDialog/DateField.style';

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
  const [text, setText] = useState(format);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
    }
  };

  return (
    <MiniDateFieldContainer>
      <IconComponent color="#6E7687" height={24} width={24} />
      {/* <span>{format}</span> */}
      <input onChange={handleTextChange} onKeyDown={handleKeyDown} value={text} />
    </MiniDateFieldContainer>
  );
};
