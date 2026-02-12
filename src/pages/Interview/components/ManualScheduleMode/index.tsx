import { useSuspenseQuery } from '@tanstack/react-query';
import { IcInfoCircleLine } from '@yourssu/design-system-react';
import { useEffect, useMemo, useState } from 'react';

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
import { scheduleOptions } from '@/query/schedule/options';
import { semesterNowOptions } from '@/query/semester/now/options';

export const ManualScheduleMode = () => {
  const { duration } = useInterviewAutoScheduleContext();
  const { partId } = useInterviewPartSelectionContext();

  const { data: semesterNow } = useSuspenseQuery(semesterNowOptions());
  const { data: applicants } = useSuspenseQuery(
    applicantOptions({ partId, semesterId: semesterNow.semesterId }),
  );
  const { data: existingSchedules } = useSuspenseQuery(scheduleOptions(partId));

  // 기존 스케줄을 Applicant와 매칭하여 초기 엔트리로 변환
  const initialScheduleEntries = useMemo(() => {
    const entries: [Date, Applicant][] = [];

    existingSchedules.forEach((schedule) => {
      // 이름으로 지원자 매칭
      const matchedApplicant = applicants.find(
        (applicant) => applicant.name === schedule.name && applicant.part === schedule.part,
      );

      if (matchedApplicant) {
        entries.push([new Date(schedule.startTime), matchedApplicant]);
      }
    });

    return entries;
  }, [existingSchedules, applicants]);

  const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);
  const { year, month, week, handlePrevWeek, handleNextWeek, jump } = useWeekIndicator({
    initialDate:
      existingSchedules.length > 0
        ? existingSchedules[0].startTime
        : selectedApplicant?.availableTimes[0],
  });
  const [completedScheduleMap, completedScheduleMapAction] = useDateMap<Applicant>({
    initialEntries: initialScheduleEntries,
    precision: duration === '1시간' ? '시간' : '분',
  });

  useEffect(() => {
    completedScheduleMapAction.reset();
    setSelectedApplicant(applicants[0]);
    // eslint-disable-next-line
  }, [initialScheduleEntries]);

  useEffect(() => {
    setSelectedApplicant(applicants[0]);
  }, [applicants]);

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
            onSelectedApplicantChange={(v) => {
              if (v.availableTimes.length > 0) {
                jump(v.availableTimes[0]);
              }
              setSelectedApplicant(v);
            }}
            selectedApplicant={selectedApplicant}
          />
        ),
        calendar: partId ? (
          <ManualScheduleCalendar
            completedScheduleMap={completedScheduleMap}
            completedScheduleMapAction={completedScheduleMapAction}
            key={selectedApplicant.applicantId} // 선택한 지원자가 바뀌면 캘린더를 다시 렌더링
            month={month}
            selectedApplicant={selectedApplicant}
            week={week}
            year={year}
          />
        ) : (
          <div className="text-text-basicSecondary flex w-full items-center justify-center gap-1">
            <IcInfoCircleLine className="size-5" />
            <span className="typo-b2_sb_16">우측에서 파트를 선택하고 일정을 생성하세요.</span>
          </div>
        ),
        sidebar: (
          <ManualScheduleSidebar
            completedApplicants={completedScheduleMap.entries()}
            totalApplicantCount={applicants.length}
          />
        ),
      }}
    />
  );
};
