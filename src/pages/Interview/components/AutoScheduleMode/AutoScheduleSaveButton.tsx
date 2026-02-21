import { useMutation } from '@tanstack/react-query';
import { BoxButton } from '@yourssu/design-system-react';
import { assert } from 'es-toolkit';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import {
  useInterviewCalendarModeContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { useInvalidateSchedule } from '@/query/schedule/hooks/useInvalidateSchedule';
import { deletePartSchedule } from '@/query/schedule/mutations/deletePartSchedule';
import { postSchedule } from '@/query/schedule/mutations/postSchedule';

interface AutoScheduleSaveButtonProps {
  method: '대면' | '비대면';
  scheduleCandidate: AutoScheduleCandidate;
}

export const AutoScheduleSaveButton = ({
  method,
  scheduleCandidate,
}: AutoScheduleSaveButtonProps) => {
  const openAlertDialog = useAlertDialog();
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
    const result = await openAlertDialog({
      title: '선택한 시간표를 저장할까요?',
      content: `${partName} 팀 면접 시간표`,
      primaryButtonText: '저장하기',
      secondaryButtonText: '취소',
    });

    if (result) {
      assert(!!partId, '일정을 만들기 위한 partId가 없어요.');
      await mutateDeletePartSchedule(partId);
      await mutatePostSchedule({
        schedules: scheduleCandidate.schedules.map((schedule) => ({
          applicantId: schedule.applicantId,
          endTime: schedule.endTime,
          locationType: method === '대면' ? '동방' : '비대면',
          partId,
          startTime: schedule.startTime,
        })),
      });
      await invalidateSchedule();

      onPartChange(null);
      setCalendarMode('면접일정');
    }
  };

  return (
    <BoxButton className="w-full" onClick={onSaveSchedule} size="xlarge" variant="filledPrimary">
      시간표 저장하기
    </BoxButton>
  );
};
