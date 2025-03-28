import { StateButton } from './StateButton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memberRoleOptions } from '@/query/member/memberRole/options.ts';

export const RoleStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const { data: roles } = useSuspenseQuery(memberRoleOptions());
  const options = roles.map((role) => ({ label: role }));

  return (
    <StateButton
      options={options}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="outlined"
    />
  );
};
