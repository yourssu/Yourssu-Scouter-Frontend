import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { PartArraySchema } from '@/query/part/schema.ts';

export const partOptions = () => {
  return queryOptions({
    queryKey: ['parts'],
    queryFn: async () => {
      const data = await api.get('parts').json();
      return PartArraySchema.parse(data);
    },
    staleTime: Infinity,
  });
};
