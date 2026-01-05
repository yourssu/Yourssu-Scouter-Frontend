import { useState } from 'react';

import { AutoScheduleHeader } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleHeader';
import { AutoScheduleSidebar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleSidebar';
import { useAutoScheduleCandidates } from '@/pages/Interview/components/AutoScheduleMode/hooks/useAutoScheduleCandidates';
import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';

export const AutoScheduleMode = () => {
  const { handleNextWeek, handlePrevWeek, month, week } = useWeekIndicator();

  const scheduleCandidates = useAutoScheduleCandidates();
  const [selectedCandidate, setSelectedCandidate] = useState<AutoScheduleCandidate>(
    scheduleCandidates[0],
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
        sidebar: (
          <AutoScheduleSidebar
            onCandidateChange={setSelectedCandidate}
            scheduleCandidates={scheduleCandidates}
            selectedCandidate={selectedCandidate}
          />
        ),
      }}
      variants="sidebar-expand"
    />
  );
};
