import { useSuspenseQuery } from '@tanstack/react-query';
import { Popover } from 'radix-ui';

import { applicantStateOptions } from '@/query/applicant/applicantState/options.ts';

import { StateButton } from './StateButton';

export const ApplicantStateButton = ({
  selectedValue,
  onStateChange,
  contentProps,
}: {
  contentProps?: Popover.PopoverContentProps;
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: states } = useSuspenseQuery(applicantStateOptions());
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
