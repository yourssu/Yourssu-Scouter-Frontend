import { useSuspenseQuery } from '@tanstack/react-query';
import { assert } from 'es-toolkit';
import { useMemo } from 'react';

import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import {
  useInterviewAutoScheduleContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { autoScheduleOptions } from '@/query/schedule/auto/options';

export const useAutoScheduleCandidates = (): AutoScheduleCandidate[] => {
  const { duration, strategy } = useInterviewAutoScheduleContext();
  const { partId } = useInterviewPartSelectionContext();

  assert(!!partId, 'partId가 없어요.');

  const { data } = useSuspenseQuery(
    autoScheduleOptions({
      size: 5,
      partId,
      duration: duration === '1시간' ? 60 : 30,
      strategy: strategy === '밀집형' ? 'MIN' : 'MAX',
    }),
  );

  return useMemo(() => {
    return data.map((v) => ({
      id: crypto.randomUUID(),
      schedules: v,
    }));
  }, [data]);
};
