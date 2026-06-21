import clsx from 'clsx';
import { differenceInMinutes, isSameDay, setHours, setMinutes, startOfDay } from 'date-fns';
import { assert } from 'es-toolkit';

import { ScheduleTooltip } from '@/pages/NewInterview/components/ScheduleTooltip';
import { startHour } from '@/pages/NewInterview/components/WeeklyCalendarLayout/type';
import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import { DraftSchedule } from '@/pages/NewInterview/NewInterviewNew/types';
import {
  minutesToPixelHeight,
  minutesToPixelTop,
} from '@/pages/NewInterview/NewInterviewNew/utils/dragPosition';
import { Applicant } from '@/query/applicant/schema';

interface DraftScheduleItemsProps {
  applicants: Applicant[];
  date: Date;
  isDragging: boolean;
}

/**
 * 특정 날짜의 드래프트 일정들을 렌더링하는 컴포넌트입니다.
 */
export const DraftScheduleItems = ({ date, applicants, isDragging }: DraftScheduleItemsProps) => {
  const { draftSchedules, activeApplicantId, setActiveApplicant, removeDraftSchedule } =
    useScheduleCreationContext();

  const daySchedules = draftSchedules.filter((s) => isSameDay(s.startTime, date));

  if (daySchedules.length === 0) {
    return null;
  }

  return (
    <>
      {daySchedules.map((schedule) => (
        <DraftScheduleItem
          applicants={applicants}
          isDragging={isDragging}
          isOther={schedule.applicantId !== activeApplicantId}
          key={schedule.applicantId}
          onRemove={() => removeDraftSchedule(schedule.applicantId)}
          onSwitchApplicant={() => setActiveApplicant(schedule.applicantId)}
          schedule={schedule}
        />
      ))}
    </>
  );
};

interface DraftScheduleItemProps {
  applicants: Applicant[];
  isDragging: boolean;
  isOther: boolean;
  onRemove: () => void;
  onSwitchApplicant: () => void;
  schedule: DraftSchedule;
}

const DraftScheduleItem = ({
  schedule,
  applicants,
  isDragging,
  isOther,
  onRemove,
  onSwitchApplicant,
}: DraftScheduleItemProps) => {
  const startMinutes = differenceInMinutes(
    schedule.startTime,
    setMinutes(setHours(startOfDay(schedule.startTime), startHour), 0),
  );
  const durationMinutes = differenceInMinutes(schedule.endTime, schedule.startTime);
  const top = minutesToPixelTop(startMinutes + startHour * 60);
  const height = minutesToPixelHeight(durationMinutes);
  const applicant = applicants.find((a) => a.applicantId === schedule.applicantId);

  assert(!!applicant, `지원자를 찾을 수 없어요: ${schedule.applicantId}`);

  return (
    <ScheduleTooltip
      actionTextContent={isOther ? '클릭으로 지원자 탭 이동' : '클릭으로 일정 제거'}
      applicant={applicant}
      endTime={schedule.endTime}
      startTime={schedule.startTime}
    >
      <div
        className={clsx(
          'absolute right-0.5 left-0.5 rounded border-2 px-1 py-0.5 select-none',
          isOther
            ? 'w-[60%] border-[#5b4dff] bg-[#5b4dff] opacity-50'
            : 'border-[#5b4dff] bg-[#5b4dff]',
          !isDragging &&
            'ease-ease cursor-pointer border-[#5b4dff] bg-[#5b4dff] transition-colors duration-200 hover:border-[#4a3fe0] hover:bg-[#4a3fe0]',
          isDragging && 'pointer-events-none',
        )}
        onClick={() => {
          if (isOther) {
            onSwitchApplicant();
          } else {
            onRemove();
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
      >
        <span className="text-sm font-semibold text-white">{schedule.applicantName}</span>
      </div>
    </ScheduleTooltip>
  );
};
