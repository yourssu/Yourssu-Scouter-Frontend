import { StateButton } from './StateButton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { applicantStateOptions } from '@/query/applicant/applicantState/options.ts';

export const ApplicantStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const { data: states } = useSuspenseQuery(applicantStateOptions());
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
