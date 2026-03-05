import { useMutation } from '@tanstack/react-query';
import { BoxButton } from '@yourssu/design-system-react';
import { addHours, addMinutes, isBefore } from 'date-fns';
import { assert } from 'es-toolkit';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import {
  useInterviewAutoScheduleContext,
  useInterviewCalendarModeContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { useScheduleConfirmDialog } from '@/pages/Interview/hooks/useScheduleConfirmDialog';
import { Applicant } from '@/query/applicant/schema';
import { useInvalidateSchedule } from '@/query/schedule/hooks/useInvalidateSchedule';
import { deletePartSchedule } from '@/query/schedule/mutations/deletePartSchedule';
import { postSchedule } from '@/query/schedule/mutations/postSchedule';

interface ManualScheduleSaveButtonProps {
  completedApplicants: [Date, Applicant][];
  method: '대면' | '비대면';
  totalApplicantCount: number;
}

export const ManualScheduleSaveButton = ({
  completedApplicants,
  method,
  totalApplicantCount,
}: ManualScheduleSaveButtonProps) => {
  const openAlertDialog = useAlertDialog();
  const { confirmScheduleSave } = useScheduleConfirmDialog();
  const { setCalendarMode } = useInterviewCalendarModeContext();
  const { partName, partId, onPartChange } = useInterviewPartSelectionContext();
  const { duration } = useInterviewAutoScheduleContext();
  const { mutateAsync: mutatePostSchedule } = useMutation({
    mutationFn: postSchedule,
  });
  const { mutateAsync: mutateDeletePartSchedule } = useMutation({
    mutationFn: deletePartSchedule,
  });
  const invalidateSchedule = useInvalidateSchedule(partId);

  const onSaveSchedule = async () => {
    if (completedApplicants.length < totalApplicantCount) {
      openAlertDialog({
        title: '지원자를 모두 배정해주세요',
        content: '아직 면접 시간이 배정되지 않은 지원자가 있어요.',
        primaryButtonText: '확인',
      });
      return;
    }

    const now = new Date();
    const schedulesToSave = completedApplicants.map(([date, applicant]) => ({
      applicantId: applicant.applicantId,
      applicantName: applicant.name,
      part: applicant.part,
      endTime: (duration === '1시간' ? addHours(date, 1) : addMinutes(date, 30)).toISOString(),
      locationType: method === '대면' ? '동방' : ('비대면' as '동방' | '비대면'),
      partId,
      startTime: date.toISOString(),
    }));

    const pastSchedules = schedulesToSave.filter((s) => isBefore(new Date(s.startTime), now));

    if (pastSchedules.length > 0) {
      const pastResult = await confirmScheduleSave(
        partName ?? '',
        pastSchedules.map((s) => ({
          applicantId: s.applicantId,
          applicantName: s.applicantName,
          endTime: s.endTime,
          part: s.part,
          startTime: s.startTime,
        })),
      );
      if (!pastResult) {
        return;
      }
    } else {
      const result = await confirmScheduleSave(partName ?? '', []);
      if (!result) {
        return;
      }
    }

    assert(!!partId, '일정을 만들기 위한 partId가 없어요.');
    await mutateDeletePartSchedule(partId);
    await mutatePostSchedule({
      schedules: schedulesToSave.map((schedule) => ({
        applicantId: schedule.applicantId,
        endTime: schedule.endTime,
        locationType: schedule.locationType,
        partId,
        startTime: schedule.startTime,
      })),
    });
    await invalidateSchedule();

    onPartChange(null);
    setCalendarMode('면접일정');
  };

  return (
    <BoxButton className="w-full" onClick={onSaveSchedule} size="xlarge" variant="filledPrimary">
      시간표 저장하기
    </BoxButton>
  );
};
