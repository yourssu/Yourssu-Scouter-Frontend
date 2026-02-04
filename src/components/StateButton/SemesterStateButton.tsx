import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';

import { semesterNowOptions } from '@/query/semester/now/options';
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
  const { data: currentSemester } = useSuspenseQuery(semesterNowOptions());
  // const options = semesters.map((semester) => ({ label: semester.semester }));

  const sortedSemesters = semesters
    .toSorted((a, b) => b.semester.localeCompare(a.semester))
    .map((semester) => ({ label: semester.semester }));

  const options = sortedSemesters.slice(
    sortedSemesters.findIndex((option) => option.label === currentSemester.semester),
  );

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
