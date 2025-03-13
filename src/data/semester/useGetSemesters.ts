import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { SemesterArraySchema } from '@/data/semester/schema.ts';

export const useGetSemesters = () => {
  return useSuspenseQuery({
    queryKey: ['semesters'],
    queryFn: async () => {
      const data = await api.get('semesters').json();
      return SemesterArraySchema.parse(data);
    },
  });
};
