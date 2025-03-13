import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { DepartmentArraySchema } from '@/data/department/schema.ts';

export const useGetDepartments = () => {
  return useSuspenseQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const data = await api.get('departments').json();
      return DepartmentArraySchema.parse(data);
    },
  });
};
