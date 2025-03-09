import { StateButton } from './StateButton';
import { useGetApplicantStates } from '@/hooks/useGetApplicantStates.ts';

export const ApplicantStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const { data: states } = useGetApplicantStates();
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
