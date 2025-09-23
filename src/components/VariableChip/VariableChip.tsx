import {
  IcCalenderLine,
  IcCloseFilled,
  IcEditLine,
  IcExternalLinkLine,
  IcLayoutLine,
  IcStarLine,
  IcUserLine,
} from '@yourssu/design-system-react';

import { ChipWrapper, CloseIconWrapper, IconWrapper, Label } from './VariableChip.style';

type ChipSize = 'large' | 'small';
type ChipType = 'applicant' | 'date' | 'link' | 'part' | 'person' | 'text';

interface VariableChipProps {
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  size?: ChipSize;
  type: ChipType;
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
  onClick,
  onDelete,
}: VariableChipProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <ChipWrapper onClick={onClick} size={size} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <IconWrapper>{iconMap[type]}</IconWrapper>
      <Label>{label}</Label>
      {label !== '파트명' && label !== '지원자' && size === 'large' ? (
        <CloseIconWrapper onClick={handleDeleteClick}>
          <IcCloseFilled />
        </CloseIconWrapper>
      ) : null}
    </ChipWrapper>
  );
};
