import { useSuspenseQuery } from '@tanstack/react-query';
import { assert } from 'es-toolkit';

import { AutoScheduleHeader } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleHeader';
import { AutoScheduleSidebar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleSidebar';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import {
  useInterviewAutoScheduleContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { autoScheduleOptions } from '@/query/schedule/auto/options';

export const AutoScheduleMode = () => {
  const { duration, strategy } = useInterviewAutoScheduleContext();
  const { partId } = useInterviewPartSelectionContext();
  const { handleNextWeek, handlePrevWeek, month, week } = useWeekIndicator();

  assert(!!partId, 'partId가 없어요.');

  const { data } = useSuspenseQuery(
    autoScheduleOptions({
      size: 5,
      partId,
      duration: duration === '1시간' ? 60 : 30,
      strategy: strategy === '밀집형' ? 'MIN' : 'MAX',
    }),
  );

  return (
    <InterviewPageLayout
      slots={{
        header: (
          <AutoScheduleHeader
            indicator={{
              week,
              month,
              onNextWeek: handleNextWeek,
              onPrevWeek: handlePrevWeek,
            }}
          />
        ),
        calendar: <div />,
        sidebar: <AutoScheduleSidebar scheduleCandidates={data} />,
      }}
      variants="sidebar-expand"
    />
  );
};
