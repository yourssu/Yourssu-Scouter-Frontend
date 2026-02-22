import { useState } from 'react';

import { AutoScheduleCalendar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleCalendar';
import { AutoScheduleHeader } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleHeader';
import { AutoScheduleSidebar } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleSidebar';
import { useAutoScheduleCandidates } from '@/pages/Interview/components/AutoScheduleMode/hooks/useAutoScheduleCandidates';
import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';

export const AutoScheduleMode = () => {
  const scheduleCandidates = useAutoScheduleCandidates();
  const initialCandidate = scheduleCandidates[0];
  const initialDateStr =
    initialCandidate?.schedules.length > 0
      ? initialCandidate.schedules.reduce((prev, curr) =>
          new Date(prev.startTime).getTime() < new Date(curr.startTime).getTime() ? prev : curr,
        ).startTime
      : undefined;

  const { handleNextWeek, handlePrevWeek, month, week, year, jump } = useWeekIndicator({
    initialDate: initialDateStr ? new Date(initialDateStr) : undefined,
  });

  const [selectedCandidate, setSelectedCandidate] =
    useState<AutoScheduleCandidate>(initialCandidate);

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
            onCandidateChange={(candidate) => {
              if (candidate.schedules.length > 0) {
                const earliestSchedule = candidate.schedules.reduce((prev, curr) =>
                  new Date(prev.startTime).getTime() < new Date(curr.startTime).getTime()
                    ? prev
                    : curr,
                );
                jump(new Date(earliestSchedule.startTime));
              }
              setSelectedCandidate(candidate);
            }}
            scheduleCandidates={scheduleCandidates}
            selectedCandidate={selectedCandidate}
          />
        ),
      }}
      variants="sidebar-expand"
    />
  );
};
