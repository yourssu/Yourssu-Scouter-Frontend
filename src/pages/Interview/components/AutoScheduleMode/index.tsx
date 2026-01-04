import { useState } from 'react';

import { AutoScheduleCalendar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleCalendar';
import { AutoScheduleHeader } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleHeader';
import { AutoScheduleSidebar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleSidebar';
import { useAutoScheduleCandidates } from '@/pages/Interview/components/AutoScheduleMode/hooks/useAutoScheduleCandidates';
import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';

export const AutoScheduleMode = () => {
  const { handleNextWeek, handlePrevWeek, month, week, year } = useWeekIndicator();

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
        calendar: (
          <AutoScheduleCalendar
            key={selectedCandidate.id} // 선택한 시간표가 바뀌면 캘린더를 다시 렌더링해요
            month={month}
            scheduleCandidate={selectedCandidate}
            week={week}
            year={year}
          />
        ),
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
