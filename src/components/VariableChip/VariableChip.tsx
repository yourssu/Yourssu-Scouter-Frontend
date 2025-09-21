import {
  IcCalenderLine,
  IcCloseFilled,
  IcEditLine,
  IcExternalLinkLine,
  IcLayoutLine,
  IcStarLine,
  IcUserLine,
} from '@yourssu/design-system-react';

import { VariableType } from '../VariableDialog/VariableDialog';
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

export const getChipType = (variableType: VariableType, variableName: string) => {
  switch (variableType) {
    case '링크':
      return 'link';
    case '사람':
      if (variableName === '지원자') {
        return 'applicant';
      } else {
        return 'person';
      }
    case '텍스트':
      if (variableName === '파트명') {
        return 'part';
      } else {
        return 'text';
      }
    case '날짜':
      return 'date';
    default:
      return 'part';
  }
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
        <CloseIconWrapper>
          <IcCloseFilled onClick={handleDeleteClick} />
        </CloseIconWrapper>
      ) : null}
    </ChipWrapper>
  );
};
