import { Popover } from 'radix-ui';

import { StateButton } from './StateButton';

const GRADE_OPTIONS = ['1학년', '2학년', '3학년', '4학년', '5학년'].map((label) => ({ label }));

export const GradeStateButton = ({
  selectedValue,
  onStateChange,
  contentProps,
  disabled = false,
}: {
  contentProps?: Popover.PopoverContentProps;
  disabled?: boolean;
  onStateChange: (value: number) => void;
  selectedValue: null | number;
}) => {
  return (
    <StateButton
      contentProps={contentProps}
      disabled={disabled}
      onSelect={(value) => onStateChange(parseInt(value))}
      options={GRADE_OPTIONS}
      selectedValue={selectedValue != null ? `${selectedValue}학년` : '-'}
      variant="outlined"
    />
  );
};
