import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { LastUpdatedTimeSchema } from '@/query/schema.ts';

export const applicantLastUpdatedTimeOptions = () => {
  return queryOptions({
    queryKey: ['applicantLastUpdatedTime'],
    queryFn: async () => {
      const data = await api.get('applicants/lastUpdatedTime').json();
      return LastUpdatedTimeSchema.parse(data);
    },
    select: (data) => data.lastUpdatedTime,
  });
};
