import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api';
import { ScheduleArraySchema } from '@/query/schedule/schema';

export const scheduleOptions = (partId: null | number) => {
  const baseKey = ['schedules'] as const;

  return queryOptions({
    queryKey: partId !== null ? [...baseKey, partId] : baseKey,
    queryFn: async () => {
      const res = await api.get('recruiter/schedule', {
        searchParams: partId !== null
          ? {
              partId: partId.toString(),
            }
          : undefined,
      });
      const data = await res.json();
      return ScheduleArraySchema.parse(data);
    },
  });
};
