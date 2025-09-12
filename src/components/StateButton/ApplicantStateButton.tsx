import { useSuspenseQuery } from '@tanstack/react-query';

import { applicantStateOptions } from '@/query/applicant/applicantState/options.ts';

import { StateButton } from './StateButton';

export const ApplicantStateButton = ({
  selectedValue,
  onStateChange,
}: {
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: states } = useSuspenseQuery(applicantStateOptions());
  const options = states.map((state) => ({ label: state }));

  return (
    <StateButton
      onSelect={onStateChange}
      options={options}
      selectedValue={selectedValue}
      variant="filledSecondary"
    />
  );
};
