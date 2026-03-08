import { useSuspenseQuery } from '@tanstack/react-query';
import { Popover } from 'radix-ui';

import { memberStateOptions } from '@/query/member/memberState/options.ts';

import { StateButton } from './StateButton';

export const MemberStateButton = ({
  selectedValue,
  onStateChange,
  contentProps,
  disabled = false,
}: {
  contentProps?: Popover.PopoverContentProps;
  disabled?: boolean;
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: states } = useSuspenseQuery(memberStateOptions());
  const options = states.map((state) => ({ label: state }));

  return (
    <StateButton
      contentProps={contentProps}
      disabled={disabled}
      onSelect={onStateChange}
      options={options}
      selectedValue={selectedValue}
      variant="filledSecondary"
    />
  );
};
