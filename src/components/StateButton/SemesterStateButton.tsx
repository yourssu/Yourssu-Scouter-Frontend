import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { StateButton } from './StateButton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { semesterOptions } from '@/query/semester/options.ts';

export const SemesterStateButton = ({
  selectedValue,
  onStateChange,
  size = 'small',
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
  size?: 'small' | 'medium';
}) => {
  const { data: semesters } = useSuspenseQuery(semesterOptions());
  const options = semesters.map((semester) => ({ label: semester.semester }));

  return (
    <StateButton
      options={options}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="outlined"
      size={size}
      icon={<IcArrowsChevronDownLine />}
    />
  );
};
