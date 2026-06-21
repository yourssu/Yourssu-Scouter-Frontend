import { useSuspenseQueries } from '@tanstack/react-query';
import { assert } from 'es-toolkit';

import { Select, type SelectProps } from '@/pages/NewInterview/_ui/Select';
import { semesterNowOptions } from '@/query/semester/now/options';
import { semesterOptions } from '@/query/semester/options';
import { Semester } from '@/query/semester/schema';

// NOTE: legacy의 Merge<...> 유틸을 인라인 처리.
type SemesterSelectProps = Omit<SelectProps<string>, 'items' | 'onValueChange' | 'placeholder'> & {
  onValueChange?: (v: Semester) => void;
};

export const SemesterSelect = ({ onValueChange, ...props }: SemesterSelectProps) => {
  const [{ data: now }, { data: semesters }] = useSuspenseQueries({
    queries: [semesterNowOptions(), semesterOptions()],
  });

  const sortedSemesters = semesters
    // 최신 학기부터 이름순으로 정렬해요.
    .toSorted((a, b) => b.semester.localeCompare(a.semester))
    .map(({ semester }) => semester);

  const semesterNameOptions = sortedSemesters.slice(
    sortedSemesters.findIndex((v) => v === now.semester),
  );

  return (
    <Select
      {...props}
      items={semesterNameOptions}
      onValueChange={(v) => {
        const semester = semesters.find(({ semester }) => semester === v);
        assert(!!semester, `학기를 찾을 수 없어요: ${v}`);
        onValueChange?.(semester);
      }}
      placeholder="학기"
    />
  );
};
