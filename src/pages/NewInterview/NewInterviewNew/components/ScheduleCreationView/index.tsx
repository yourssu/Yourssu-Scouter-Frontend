import { Lottie } from '@toss/lottie';
import { min, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';

import { SegmentedControl } from '@/pages/Interview/components/SegmentedControl';
import { CalendarPaper } from '@/pages/NewInterview/components/CalendarPaper';
import { ApplicantSelectionPanel } from '@/pages/NewInterview/NewInterviewNew/components/ScheduleCreationView/ApplicantSelectionPanel';
import { DraggableWeeklyCalendar } from '@/pages/NewInterview/NewInterviewNew/components/ScheduleCreationView/DraggableWeeklyCalendar';
import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import { usePrefillExistingSchedules } from '@/pages/NewInterview/NewInterviewNew/hooks/usePrefillExistingSchedules';
import { useScheduleApplicants } from '@/pages/NewInterview/NewInterviewNew/hooks/useScheduleApplicants';
import {
  extractUniqueDates,
  getDateBounds,
  getNavigationDisabled,
} from '@/pages/NewInterview/NewInterviewNew/utils/calendarNavigation';

export const ScheduleCreationView = () => {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'전체' | '희망'>('전체');
  const { selectedPartId, selectedSemesterId, activeApplicantId } = useScheduleCreationContext();

  const { parts, allApplicants, applicants } = useScheduleApplicants();

  // 파트 선택 시 기존 면접 일정이 있는 지원자의 블록을 draft로 미리 채워요.
  const { isLoading: isPrefillingSchedules } = usePrefillExistingSchedules();

  const showCalendar = selectedSemesterId !== null && selectedPartId !== null;

  const activeApplicant = useMemo(
    () => applicants.find((a) => a.applicantId === activeApplicantId),
    [applicants, activeApplicantId],
  );

  // 날짜 필터링 및 네비게이션은 유틸리티로 위임
  const filteredDates = useMemo(() => {
    if (viewMode !== '희망' || !activeApplicant) {
      return undefined;
    }
    return extractUniqueDates(activeApplicant);
  }, [viewMode, activeApplicant]);

  const { minDate, maxDate } = useMemo(() => getDateBounds(activeApplicant), [activeApplicant]);

  const { disablePrevious, disableNext } = useMemo(
    () => getNavigationDisabled(viewMode, displayDate, minDate, maxDate),
    [viewMode, displayDate, minDate, maxDate],
  );

  // 지원자 선택 시 첫 희망 일정의 주차로 이동
  const handleApplicantSelect = (applicant: (typeof applicants)[number]) => {
    if (applicant.availableTimes.length > 0) {
      const dates = applicant.availableTimes.map((time) => parseISO(time));
      setDisplayDate(min(dates));
    }
  };

  return (
    <div className="flex w-full gap-6">
      <div>
        <div className="sticky top-[14px] flex max-h-[calc(100dvh_-_28px)] w-[280px] shrink-0 flex-col gap-4">
          <ApplicantSelectionPanel
            allApplicants={allApplicants}
            applicants={applicants}
            isPrefillingSchedules={isPrefillingSchedules}
            onApplicantSelect={handleApplicantSelect}
            parts={parts}
          />
        </div>
      </div>

      {!showCalendar && (
        <div className="flex h-full flex-[1_1_0] flex-col items-center justify-center">
          <Lottie autoPlay className="size-30" delay={100} src="/lotties/left-arrow.lottie.json" />
          <div className="text-center text-lg font-medium whitespace-pre-wrap text-[#4e5968]">
            {'먼저, 왼쪽 패널에서\n학기와 파트를 선택해주세요'}
          </div>
        </div>
      )}
      {showCalendar && (
        <CalendarPaper className="pr-0">
          <CalendarPaper.Header>
            <CalendarPaper.HeaderRow>
              <CalendarPaper.WeeklyIndicator
                date={displayDate}
                disableNext={disableNext}
                disablePrevious={disablePrevious}
                onDateChange={setDisplayDate}
              />
              <SegmentedControl
                onChange={(mode) => {
                  setViewMode(mode);
                  if (mode === '희망' && minDate) {
                    setDisplayDate(minDate);
                  }
                }}
                options={['전체', '희망']}
                value={viewMode}
              />
            </CalendarPaper.HeaderRow>
          </CalendarPaper.Header>
          <CalendarPaper.Body>
            <DraggableWeeklyCalendar
              applicants={applicants}
              displayDate={displayDate}
              filteredDates={filteredDates}
            />
          </CalendarPaper.Body>
        </CalendarPaper>
      )}
    </div>
  );
};
