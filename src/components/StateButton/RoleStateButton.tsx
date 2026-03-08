import { useSuspenseQuery } from '@tanstack/react-query';
import { Popover } from 'radix-ui';

import { memberRoleOptions } from '@/query/member/memberRole/options.ts';

import { StateButton } from './StateButton';

export const RoleStateButton = ({
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
  const { data: roles } = useSuspenseQuery(memberRoleOptions());
  const options = roles.map((role) => ({ label: role }));

  return (
    <StateButton
      contentProps={contentProps}
      disabled={disabled}
      onSelect={onStateChange}
      options={options}
      selectedValue={selectedValue}
      variant="outlined"
    />
  );
};
