import {
  IcCalenderLine,
  IcEditLine,
  IcExternalLinkLine,
  IcLayoutLine,
  IcStarLine,
  IcUserLine,
} from '@yourssu/design-system-react';
import { ChipWrapper, IconWrapper, Label } from './VariableChip.style';

type ChipSize = 'large' | 'small';
type ChipType = 'person' | 'date' | 'link' | 'text' | 'part' | 'applicant';

interface VariableChipProps {
  type: ChipType;
  label: string;
  size?: ChipSize;
}

const iconMap: Record<ChipType, React.ReactNode> = {
  person: <IcUserLine />,
  date: <IcCalenderLine />,
  link: <IcExternalLinkLine />,
  text: <IcEditLine />,
  part: <IcLayoutLine />,
  applicant: <IcStarLine />,
};

export const VariableChip = ({
  type,
  label,
  size = 'large',
}: VariableChipProps) => {
  return (
    <ChipWrapper size={size}>
      <IconWrapper>{iconMap[type]}</IconWrapper>
      <Label>{label}</Label>
    </ChipWrapper>
  );
};
