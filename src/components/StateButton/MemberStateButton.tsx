import { useSuspenseQuery } from '@tanstack/react-query';
import { Popover } from 'radix-ui';

import { memberStateOptions } from '@/query/member/memberState/options.ts';

import { StateButton } from './StateButton';

export const MemberStateButton = ({
  selectedValue,
  onStateChange,
  contentProps,
}: {
  contentProps?: Popover.PopoverContentProps;
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: states } = useSuspenseQuery(memberStateOptions());
  const options = states.map((state) => ({ label: state }));

  return (
    <StateButton
      contentProps={contentProps}
      onSelect={onStateChange}
      options={options}
      selectedValue={selectedValue}
      variant="filledSecondary"
    />
  );
};
