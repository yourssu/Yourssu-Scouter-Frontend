import { useMutation } from '@tanstack/react-query';
import { BoxButton } from '@yourssu/design-system-react';
import { addHours, addMinutes } from 'date-fns';
import { assert } from 'es-toolkit';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import {
  useInterviewAutoScheduleContext,
  useInterviewPartSelectionContext,
} from '@/pages/Interview/context';
import { Applicant } from '@/query/applicant/schema';
import { useInvalidateSchedule } from '@/query/schedule/hooks/useInvalidateSchedule';
import { deletePartSchedule } from '@/query/schedule/mutations/deletePartSchedule';
import { postSchedule } from '@/query/schedule/mutations/postSchedule';

interface ManualScheduleSaveButtonProps {
  completedApplicants: [Date, Applicant][];
  totalApplicantCount: number;
}

export const ManualScheduleSaveButton = ({
  completedApplicants,
  totalApplicantCount,
}: ManualScheduleSaveButtonProps) => {
  const { partName, partId } = useInterviewPartSelectionContext();
  const openAlertDialog = useAlertDialog();
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

    const result = await openAlertDialog({
      title: '이대로 면접 일정을 저장할까요?',
      content: `${partName} 팀 면접 시간표`,
      primaryButtonText: '저장하기',
      secondaryButtonText: '취소',
    });

    if (result) {
      assert(!!partId, '일정을 만들기 위한 partId가 없어요.');
      await mutateDeletePartSchedule(partId);
      await mutatePostSchedule({
        schedules: completedApplicants.map(([date, applicant]) => ({
          applicantId: applicant.applicantId,
          partId,
          startTime: date.toISOString(),
          endTime: (duration === '1시간' ? addHours(date, 1) : addMinutes(date, 30)).toISOString(),
        })),
      });
      await invalidateSchedule();
    }
  };

  return (
    <BoxButton className="w-full" onClick={onSaveSchedule} size="xlarge" variant="filledPrimary">
      시간표 저장하기
    </BoxButton>
  );
};
