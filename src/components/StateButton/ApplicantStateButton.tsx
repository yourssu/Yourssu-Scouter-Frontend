import { StateButton } from './StateButton';
import { useGetApplicantStates } from '@/data/applicants/hooks/useGetApplicantStates.ts';

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
