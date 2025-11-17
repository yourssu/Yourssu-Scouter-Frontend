import { useSuspenseQuery } from '@tanstack/react-query';

import { usePartFilter } from '@/hooks/usePartFilter';
import { AvailableTimesHeader } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesHeader';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { applicantOptions } from '@/query/applicant/options';

export const AvailableTimesMode = () => {
  // Todo: 모든 모드에서 현재 선택 파트를 공유해야하므로 usePartFilter 대신 context로 partName 관리 필요
  const { partId, partName, onPartChange } = usePartFilter();
  const { year, month, week, handlePrevWeek, handleNextWeek } = useWeekIndicator();

  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId }));

  return (
    <InterviewPageLayout
      slots={{
        header: (
          <AvailableTimesHeader
            applicants={applicants}
            indicator={{
              year,
              month,
              week,
              onNextWeek: handleNextWeek,
              onPrevWeek: handlePrevWeek,
            }}
            part={{
              partName,
              onPartChange,
            }}
          />
        ),
        calendar: <div />,
        sidebar: <div />,
      }}
    />
  );
};
