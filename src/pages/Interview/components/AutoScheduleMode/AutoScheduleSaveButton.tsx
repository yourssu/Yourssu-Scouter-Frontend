import { useMutation } from '@tanstack/react-query';
import { BoxButton } from '@yourssu/design-system-react';
import { isBefore } from 'date-fns';
import { assert } from 'es-toolkit';

import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import {
  useInterviewCalendarModeContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { useScheduleConfirmDialog } from '@/pages/Interview/hooks/useScheduleConfirmDialog';
import { useInvalidateSchedule } from '@/query/schedule/hooks/useInvalidateSchedule';
import { deletePartSchedule } from '@/query/schedule/mutations/deletePartSchedule';
import { postSchedule } from '@/query/schedule/mutations/postSchedule';

interface AutoScheduleSaveButtonProps {
  scheduleCandidate: AutoScheduleCandidate;
}

export const AutoScheduleSaveButton = ({ scheduleCandidate }: AutoScheduleSaveButtonProps) => {
  const { confirmScheduleSave } = useScheduleConfirmDialog();
  const { setCalendarMode } = useInterviewCalendarModeContext();
  const { partName, partId, onPartChange } = useInterviewPartSelectionContext();
  const { mutateAsync: mutatePostSchedule } = useMutation({
    mutationFn: postSchedule,
  });
  const { mutateAsync: mutateDeletePartSchedule } = useMutation({
    mutationFn: deletePartSchedule,
  });
  const invalidateSchedule = useInvalidateSchedule(partId);

  const onSaveSchedule = async () => {
    const now = new Date();
    const pastSchedules = scheduleCandidate.schedules.filter((s) =>
      isBefore(new Date(s.startTime), now),
    );

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
      schedules: scheduleCandidate.schedules.map((schedule) => ({
        applicantId: schedule.applicantId,
        endTime: schedule.endTime,
        locationType: '동방',
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
