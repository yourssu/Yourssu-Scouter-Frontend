import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { DepartmentArraySchema } from '@/query/department/schema.ts';

export const departmentOptions = () => {
  return queryOptions({
    queryKey: ['departments'],
    queryFn: async () => {
      const data = await api.get('departments').json();
      return DepartmentArraySchema.parse(data);
    },
    staleTime: Infinity,
  });
};
