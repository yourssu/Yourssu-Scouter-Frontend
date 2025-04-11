import { IcArrowsChevronUpLine } from '@yourssu/design-system-react';
import { ReactNode } from 'react';
import { GenericDialog } from '../dialog/GenericDialog';
import { StyledBoxButton } from './StateButton.style';
import { Popover } from 'radix-ui';

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
  rightIcon = <IcArrowsChevronUpLine />,
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
