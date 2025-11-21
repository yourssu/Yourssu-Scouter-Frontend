import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { AvailableTimesCalendar } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesCalendar';
import { AvailableTimesHeader } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesHeader';
import { AvailableTimesSidebar } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesSidebar';
import { AvailableTimesModeHoverContext } from '@/pages/Interview/components/AvailableTimesMode/context';
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

  const [hoveredBlockApplicantIds, setHoveredBlockApplicantIds] = useState<number[]>([]);
  const [hoveredChipApplicantId, setHoveredChipApplicantId] = useState<null | number>(null);

  return (
    <AvailableTimesModeHoverContext.Provider
      value={{
        hoveredBlockApplicantIds,
        hoveredChipApplicantId,
        setHoveredBlockApplicantIds,
        setHoveredChipApplicantId,
      }}
    >
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
          calendar: (
            <AvailableTimesCalendar
              availableApplicants={availableApplicants}
              month={month}
              week={week}
              year={year}
            />
          ),
          sidebar: <AvailableTimesSidebar />,
        }}
      />
    </AvailableTimesModeHoverContext.Provider>
  );
};
