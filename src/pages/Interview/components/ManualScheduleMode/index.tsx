import { useSuspenseQuery } from '@tanstack/react-query';
import { IcInfoCircleLine } from '@yourssu/design-system-react';
import { useEffect, useMemo, useState } from 'react';

import { useDateMap } from '@/hooks/useDateMap';
import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';
import { ManualScheduleCalendar } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleCalendar';
import { ManualScheduleHeader } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleHeader';
import { ManualScheduleSidebar } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebar';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { useWeekIndicator } from '@/pages/Interview/hooks/useWeekIndicator';
import { applicantOptions } from '@/query/applicant/options';
import { Applicant } from '@/query/applicant/schema';
import { scheduleOptions } from '@/query/schedule/options';
import { semesterNowOptions } from '@/query/semester/now/options';
import { LocationType } from '@/types/location';

export type ScheduledApplicant = Applicant & {
  locationDetail?: null | string;
  locationType?: LocationType;
};

export const ManualScheduleMode = () => {
  const { partId } = useInterviewPartSelectionContext();

  const { data: semesterNow } = useSuspenseQuery(semesterNowOptions());
  const { data: applicants } = useSuspenseQuery({
    ...applicantOptions({ partId, semesterId: semesterNow.semesterId }),
    select: (v) => v.filter(({ state }) => state === '심사 진행 중'),
  });
  const { data: existingSchedules } = useSuspenseQuery(scheduleOptions(partId));

  // 기존 스케줄을 Applicant와 매칭하여 초기 엔트리로 변환
  const initialScheduleEntries = useMemo(() => {
    const entries: [Date, ScheduledApplicant][] = [];

    existingSchedules.forEach((schedule) => {
      // 이름으로 지원자 매칭
      const matchedApplicant = applicants.find(
        (applicant) => applicant.name === schedule.name && applicant.part === schedule.part,
      );

      if (matchedApplicant) {
        entries.push([
          new Date(schedule.startTime),
          {
            ...matchedApplicant,
            locationType: schedule.locationType,
            locationDetail: schedule.locationDetail,
          },
        ]);
      }
    });

    return entries;
  }, [existingSchedules, applicants]);

  const [selectedApplicant, setSelectedApplicant] = useState<ScheduledApplicant>(applicants[0]);
  const { year, month, week, handlePrevWeek, handleNextWeek, jump } = useWeekIndicator({
    initialDate:
      existingSchedules.length > 0
        ? existingSchedules[0].startTime
        : selectedApplicant?.availableTimes[0],
  });
  const [completedScheduleMap, completedScheduleMapAction] = useDateMap<ScheduledApplicant>({
    initialEntries: initialScheduleEntries,
    precision: '분',
  });
  const [interviewMethod, setInterviewMethod] = useState<'대면' | '비대면'>('대면');

  useEffect(() => {
    completedScheduleMapAction.reset();
    const firstApplicant = applicants[0];
    const initialMatchedApplicant = initialScheduleEntries.find(
      ([, a]) => a.applicantId === firstApplicant?.applicantId,
    )?.[1];
    setSelectedApplicant(initialMatchedApplicant || firstApplicant);
    // eslint-disable-next-line
  }, [initialScheduleEntries]);

  useEffect(() => {
    const initialMatchedApplicant = initialScheduleEntries.find(
      ([, a]) => a.applicantId === applicants[0]?.applicantId,
    )?.[1];
    setSelectedApplicant(initialMatchedApplicant || applicants[0]);
  }, [applicants, initialScheduleEntries]);

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
              const settedApplicantEntry = completedScheduleMap
                .entries()
                .find(([, applicant]) => applicant.applicantId === v.applicantId);

              const initialMatchedApplicant = initialScheduleEntries.find(
                ([, a]) => a.applicantId === v.applicantId,
              )?.[1];

              const targetApplicant = settedApplicantEntry?.[1] || initialMatchedApplicant || v;

              if (settedApplicantEntry) {
                jump(settedApplicantEntry[0]);
              } else if (targetApplicant.availableTimes.length > 0) {
                const earliest = Math.min(
                  ...targetApplicant.availableTimes.map((time) => new Date(time).getTime()),
                );
                jump(new Date(earliest));
              }
              setSelectedApplicant(targetApplicant);
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
            method={interviewMethod}
            onChangeMethod={setInterviewMethod}
            totalApplicantCount={applicants.length}
          />
        ),
      }}
    />
  );
};
