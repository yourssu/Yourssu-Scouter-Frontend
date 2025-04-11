import { IcArrowsChevronUpLine } from '@yourssu/design-system-react';
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
}

export const StateButton = ({
  options,
  selectedValue,
  onSelect,
  variant = 'filledSecondary',
  size = 'small',
  rightIcon = <IcArrowsChevronUpLine />,
  leftIcon,
}: StateButtonProps) => {
  return (
    <GenericDialog options={options} onSelect={onSelect}>
      {(triggerProps) => (
        <StyledBoxButton
          size={size}
          variant={variant}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
          $selectedValue={selectedValue}
          {...triggerProps}
        >
          {selectedValue}
        </StyledBoxButton>
      )}
    </GenericDialog>
  );
};
