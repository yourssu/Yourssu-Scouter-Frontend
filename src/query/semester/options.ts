import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { SemesterArraySchema } from '@/query/semester/schema.ts';

export const semesterOptions = () => {
  return queryOptions({
    queryKey: ['semesters'],
    queryFn: async () => {
      const data = await api.get('semesters').json();
      return SemesterArraySchema.parse(data);
    },
  });
};
