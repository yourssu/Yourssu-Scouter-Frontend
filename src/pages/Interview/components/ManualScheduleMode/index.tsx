import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useDateMap } from '@/hooks/useDateMap';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { ManualScheduleCalendar } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleCalendar';
import { ManualScheduleHeader } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleHeader';
import { ManualScheduleSidebar } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebar';
import {
  useInterviewAutoScheduleContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { applicantOptions } from '@/query/applicant/options';
import { Applicant } from '@/query/applicant/schema';

export const ManualScheduleMode = () => {
  const { duration } = useInterviewAutoScheduleContext();
  const { partId } = useInterviewPartSelectionContext();
  const { year, month, week, handlePrevWeek, handleNextWeek } = useWeekIndicator();

  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId }));

  const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);
  const [completedScheduleMap, completedScheduleMapAction] = useDateMap<Applicant>({
    precision: duration === '1시간' ? '시간' : '분',
  });

  return (
    <InterviewPageLayout
      slots={{
        header: (
          <ManualScheduleHeader
            applicants={applicants}
            completedApplicants={Array.from(completedScheduleMap.values())}
            indicator={{
              month,
              onNextWeek: handleNextWeek,
              onPrevWeek: handlePrevWeek,
              week,
            }}
            onSelectedApplicantChange={setSelectedApplicant}
            selectedApplicant={selectedApplicant}
          />
        ),
        calendar: (
          <ManualScheduleCalendar
            completedScheduleMap={completedScheduleMap}
            completedScheduleMapAction={completedScheduleMapAction}
            key={selectedApplicant.applicantId} // 선택한 지원자가 바뀌면 캘린더를 다시 렌더링
            month={month}
            selectedApplicant={selectedApplicant}
            week={week}
            year={year}
          />
        ),
        sidebar: (
          <ManualScheduleSidebar
            completedApplicants={Array.from(completedScheduleMap.values())}
            totalApplicantCount={applicants.length}
          />
        ),
      }}
    />
  );
};
