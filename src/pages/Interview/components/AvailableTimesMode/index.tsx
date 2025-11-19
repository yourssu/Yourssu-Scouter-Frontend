import { useSuspenseQuery } from '@tanstack/react-query';

import { AvailableTimesHeader } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesHeader';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { useAvailableApplicantsInWeek } from '@/pages/Interview/hooks/useAvailableApplicantsInWeek';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { applicantOptions } from '@/query/applicant/options';

export const AvailableTimesMode = () => {
  const { partId } = useInterviewPartSelectionContext();
  const { year, month, week, handlePrevWeek, handleNextWeek } = useWeekIndicator();

  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId }));
  const availableApplicants = useAvailableApplicantsInWeek({
    year,
    month,
    week,
    applicants,
  });

  return (
    <InterviewPageLayout
      slots={{
        header: (
          <AvailableTimesHeader
            availableApplicants={availableApplicants}
            indicator={{
              month,
              week,
              onNextWeek: handleNextWeek,
              onPrevWeek: handlePrevWeek,
            }}
          />
        ),
        calendar: <div />,
        sidebar: <div />,
      }}
    />
  );
};
