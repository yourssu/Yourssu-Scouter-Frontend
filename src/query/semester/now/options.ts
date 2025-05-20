import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { SemesterSchema } from '@/query/semester/schema.ts';

export const semesterNowOptions = () => {
  return queryOptions({
    queryKey: ['semesterNow'],
    queryFn: async () => {
      const data = await api.get('semesters/now').json();
      return SemesterSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
