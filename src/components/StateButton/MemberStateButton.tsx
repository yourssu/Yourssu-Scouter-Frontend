import { StateButton } from './StateButton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memberStateOptions } from '@/query/member/memberState/options.ts';

export const MemberStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const { data: states } = useSuspenseQuery(memberStateOptions());
  const options = states.map((state) => ({ label: state }));

  return (
    <StateButton
      options={options}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="filledSecondary"
    />
  );
};
