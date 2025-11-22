import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { ReactNode } from 'react';

import { GenericDialog } from '../dialog/legacy/GenericDialog';
import { StyledBoxButton } from './StateButton.style';

export type DialogOption = {
  color?: string;
  label: string;
};

interface StateButtonProps {
  leftIcon?: ReactNode;
  onSelect: (value: string) => void;
  options: DialogOption[];
  rightIcon?: ReactNode;
  selectedValue: string;
  size?: 'medium' | 'small';
  variant?: 'filledPrimary' | 'filledSecondary' | 'outlined';
  width?: number;
}

export const StateButton = ({
  options,
  selectedValue,
  onSelect,
  variant = 'filledSecondary',
  size = 'small',
  rightIcon = <IcArrowsChevronDownLine />,
  leftIcon,
  width,
}: StateButtonProps) => {
  return (
    <GenericDialog onSelect={onSelect} options={options} width={width}>
      <Popover.Trigger asChild>
        <StyledBoxButton
          $selectedValue={selectedValue}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          size={size}
          variant={variant}
        >
          {selectedValue}
        </StyledBoxButton>
      </Popover.Trigger>
    </GenericDialog>
  );
};
