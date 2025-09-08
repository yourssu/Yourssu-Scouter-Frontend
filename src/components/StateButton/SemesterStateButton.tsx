import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';

import { semesterOptions } from '@/query/semester/options.ts';

import { StateButton } from './StateButton';

export const SemesterStateButton = ({
  selectedValue,
  onStateChange,
  size = 'small',
}: {
  onStateChange: (value: string) => void;
  selectedValue: string;
  size?: 'medium' | 'small';
}) => {
  const { data: semesters } = useSuspenseQuery(semesterOptions());
  const options = semesters.map((semester) => ({ label: semester.semester }));

  return (
    <StateButton
      onSelect={onStateChange}
      options={options}
      rightIcon={<IcArrowsChevronDownLine />}
      selectedValue={selectedValue}
      size={size}
      variant="outlined"
    />
  );
};
