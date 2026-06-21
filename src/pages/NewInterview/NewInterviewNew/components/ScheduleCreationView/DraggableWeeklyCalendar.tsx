import { useCallback, useMemo, useRef } from 'react';

import { WeeklyCalendarLayout } from '@/pages/NewInterview/components/WeeklyCalendarLayout';
import { AvailableTimeSlots } from '@/pages/NewInterview/NewInterviewNew/components/ScheduleCreationView/AvailableTimeSlots';
import { DraftScheduleItems } from '@/pages/NewInterview/NewInterviewNew/components/ScheduleCreationView/DraftScheduleItems';
import { DragPreview } from '@/pages/NewInterview/NewInterviewNew/components/ScheduleCreationView/DragPreview';
import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import {
  useAvailableTimeRanges,
  useDragSchedule,
} from '@/pages/NewInterview/NewInterviewNew/hooks/useDragSchedule';
import { useScrollToAvailableSlot } from '@/pages/NewInterview/NewInterviewNew/hooks/useScrollToAvailableSlot';
import { Applicant } from '@/query/applicant/schema';

interface DraggableWeeklyCalendarProps {
  applicants: Applicant[];
  displayDate: Date;
  filteredDates?: Date[];
}

export const DraggableWeeklyCalendar = ({
  applicants,
  displayDate,
  filteredDates,
}: DraggableWeeklyCalendarProps) => {
  const { activeApplicantId } = useScheduleCreationContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeApplicant = useMemo(
    () => applicants.find((a) => a.applicantId === activeApplicantId),
    [applicants, activeApplicantId],
  );

  const availableTimeRanges = useAvailableTimeRanges(activeApplicant);

  const { isDragging, dragStart, dragCurrent, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragSchedule(activeApplicant, availableTimeRanges);

  useScrollToAvailableSlot(
    containerRef,
    activeApplicantId,
    !!activeApplicant && activeApplicant.availableTimes.length > 0,
  );

  const renderDayContent = useCallback(
    (date: Date) => (
      <div
        className="absolute top-2 right-0 bottom-0 left-0"
        onMouseDown={(e) => handleMouseDown(e, date)}
        onMouseMove={(e) => handleMouseMove(e, date)}
        onMouseUp={handleMouseUp}
      >
        {activeApplicant && (
          <AvailableTimeSlots
            availableTimeRanges={availableTimeRanges}
            date={date}
            isDragging={isDragging}
          />
        )}
        <DraftScheduleItems applicants={applicants} date={date} isDragging={isDragging} />
        <DragPreview
          date={date}
          dragCurrent={dragCurrent}
          dragStart={dragStart}
          isDragging={isDragging}
        />
      </div>
    ),
    [
      activeApplicant,
      availableTimeRanges,
      isDragging,
      dragStart,
      dragCurrent,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      applicants,
    ],
  );

  return (
    <div className="relative" ref={containerRef}>
      <WeeklyCalendarLayout displayDate={displayDate} filteredDates={filteredDates}>
        <WeeklyCalendarLayout.Header top={72} />
        <WeeklyCalendarLayout.Body>{renderDayContent}</WeeklyCalendarLayout.Body>
      </WeeklyCalendarLayout>
    </div>
  );
};
