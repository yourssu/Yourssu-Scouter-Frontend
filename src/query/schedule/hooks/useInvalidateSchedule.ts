import { useQueryClient } from '@tanstack/react-query';

import { scheduleOptions } from '@/query/schedule/options';

export const useInvalidateSchedule = (partId: null | number) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: scheduleOptions(partId).queryKey,
    });
};
