import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { LastUpdatedTimeSchema } from '@/query/schema.ts';

export const memberLastUpdatedTimeOptions = () => {
  return queryOptions({
    queryKey: ['memberLastUpdatedTime'],
    queryFn: async () => {
      const data = await api.get('members/lastUpdatedTime').json();
      return LastUpdatedTimeSchema.parse(data);
    },
    select: (data) => data.lastUpdatedTime,
  });
};
