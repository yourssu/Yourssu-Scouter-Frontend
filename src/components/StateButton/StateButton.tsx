import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { ReactNode } from 'react';
import { GenericDialog } from '../dialog/GenericDialog';
import { StyledBoxButton } from './StateButton.style';

export type DialogOption = {
  label: string;
  color?: string;
};

interface StateButtonProps {
  options: DialogOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: 'filledPrimary' | 'filledSecondary' | 'outlined';
  size?: 'small' | 'medium';
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
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
    <GenericDialog width={width} options={options} onSelect={onSelect}>
      <Popover.Trigger asChild>
        <StyledBoxButton
          size={size}
          variant={variant}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
          $selectedValue={selectedValue}
        >
          {selectedValue}
        </StyledBoxButton>
      </Popover.Trigger>
    </GenericDialog>
  );
};
