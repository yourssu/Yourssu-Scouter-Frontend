import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { SemesterArraySchema } from '@/data/semester/schema.ts';
import { semesterKeys } from '@/data/semester/key.ts';

export const useGetSemesters = () => {
  return useSuspenseQuery({
    queryKey: semesterKeys.all,
    queryFn: async () => {
      const data = await api.get('semesters').json();
      return SemesterArraySchema.parse(data);
    },
  });
};
