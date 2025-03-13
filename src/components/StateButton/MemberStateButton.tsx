import { StateButton } from './StateButton';
import { useGetMemberStates } from '@/data/members/hooks/useGetMemberStates.ts';

export const MemberStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const { data: states } = useGetMemberStates();
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
