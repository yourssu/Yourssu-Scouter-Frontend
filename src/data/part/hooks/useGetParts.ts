import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { PartArraySchema } from '@/data/part/schema.ts';
import { partsQueryKey } from '@/data/part/key.ts';

export const useGetParts = () => {
  return useSuspenseQuery({
    queryKey: partsQueryKey,
    queryFn: async () => {
      const data = await api.get('parts').json();
      return PartArraySchema.parse(data);
    },
  });
};
