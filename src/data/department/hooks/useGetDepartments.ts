import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { DepartmentArraySchema } from '@/data/department/schema.ts';
import { departmentsQueryKey } from '@/data/department/key.ts';

export const useGetDepartments = () => {
  return useSuspenseQuery({
    queryKey: departmentsQueryKey,
    queryFn: async () => {
      const data = await api.get('departments').json();
      return DepartmentArraySchema.parse(data);
    },
  });
};
