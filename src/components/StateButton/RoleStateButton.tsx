import { useSuspenseQuery } from '@tanstack/react-query';

import { memberRoleOptions } from '@/query/member/memberRole/options.ts';

import { StateButton } from './StateButton';

export const RoleStateButton = ({
  selectedValue,
  onStateChange,
}: {
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: roles } = useSuspenseQuery(memberRoleOptions());
  const options = roles.map((role) => ({ label: role }));

  return (
    <StateButton
      onSelect={onStateChange}
      options={options}
      selectedValue={selectedValue}
      variant="outlined"
    />
  );
};
