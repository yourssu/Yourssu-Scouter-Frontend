import { useMutation } from '@tanstack/react-query';
import { BoxButton } from '@yourssu/design-system-react';
import { compareAsc } from 'date-fns';
import { assert } from 'es-toolkit';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Dialog } from '@/components/dialog';
import { useAlertDialog } from '@/hooks/useAlertDialog';
import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import { useScheduleApplicants } from '@/pages/NewInterview/NewInterviewNew/hooks/useScheduleApplicants';
import { DraftSchedule } from '@/pages/NewInterview/NewInterviewNew/types';
import { useInvalidateSchedule } from '@/query/schedule/hooks/useInvalidateSchedule';
import { deletePartSchedule } from '@/query/schedule/mutations/deletePartSchedule';
import { postSchedule } from '@/query/schedule/mutations/postSchedule';
import { formatTemplates } from '@/utils/date';

const SaveDialogContent = ({
  closeAsFalse,
  closeAsTrue,
  draftSchedules,
  selectedPartId,
  selectedPartName,
}: {
  closeAsFalse: () => void;
  closeAsTrue: () => void;
  draftSchedules: DraftSchedule[];
  selectedPartId: number;
  selectedPartName: string;
}) => {
  const { mutateAsync: mutateDeletePartSchedule, isPending: isDeleting } = useMutation({
    mutationFn: deletePartSchedule,
  });
  const { mutateAsync: mutatePostSchedule, isPending: isPosting } = useMutation({
    mutationFn: postSchedule,
  });
  const invalidateSchedule = useInvalidateSchedule();

  const isLoading = isDeleting || isPosting;

  const onSubmit = async () => {
    // NOTE: post에서 에러 발생 시 delete된 채로 끝나므로 일정을 되돌리는 로직이 필요함
    await mutateDeletePartSchedule(selectedPartId);
    await mutatePostSchedule({
      schedules: draftSchedules.map((schedule) => ({
        applicantId: schedule.applicantId,
        endTime: schedule.endTime.toISOString(),
        locationDetail: null,
        // draft 에는 장소 정보가 없으므로 기본값 사용
        locationType: '동방',
        partId: selectedPartId,
        startTime: schedule.startTime.toISOString(),
      })),
    });
    await invalidateSchedule();
    closeAsTrue();
  };

  return (
    <>
      <Dialog.Content>
        <div className="flex flex-col gap-2 pb-2">
          <span className="typo-b2_sb_15">{selectedPartName}팀 지원자 일정</span>
          {draftSchedules
            .toSorted((a, b) => compareAsc(a.startTime, b.startTime))
            .map((schedule) => (
              <div
                className="bg-bg-basicLight flex items-center justify-between rounded-lg px-4 py-2.5"
                key={schedule.applicantId}
              >
                <span className="typo-b3_sb_14">{schedule.applicantName}</span>
                <span className="typo-b3_rg_14">
                  {formatTemplates['1.01 (월) 23:00'](schedule.startTime)} ~{' '}
                  {formatTemplates['23:00'](schedule.endTime)}
                </span>
              </div>
            ))}
        </div>
      </Dialog.Content>
      <Dialog.ButtonGroup>
        <Dialog.Button onClick={closeAsFalse} size="large" variant="filledSecondary">
          취소
        </Dialog.Button>
        <Dialog.Button disabled={isLoading} onClick={onSubmit} size="large" variant="filledPrimary">
          {isLoading ? '저장 중...' : '확인'}
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </>
  );
};

export const SaveScheduleButton = () => {
  const navigate = useNavigate();
  const { draftSchedules, selectedPartId } = useScheduleCreationContext();
  const openAlertDialog = useAlertDialog();
  const { applicants, selectedPart } = useScheduleApplicants();

  // 모든 지원자가 일정을 가지고 있는지 확인
  const allApplicantsScheduled = useMemo(() => {
    if (applicants.length === 0) {
      return false;
    }
    const scheduledIds = new Set(draftSchedules.map((s) => s.applicantId));
    return applicants.every((applicant) => scheduledIds.has(applicant.applicantId));
  }, [applicants, draftSchedules]);

  const handleSubmit = async () => {
    assert(!!selectedPart, '선택된 파트가 없어요.');
    assert(!!selectedPartId, '일정을 만들기 위한 partId가 없어요.');

    const result = await openAlertDialog({
      title: '이대로 면접 일정을 저장할까요?',
      content: ({ closeAsTrue, closeAsFalse }) => (
        <SaveDialogContent
          closeAsFalse={closeAsFalse}
          closeAsTrue={closeAsTrue}
          draftSchedules={draftSchedules}
          selectedPartId={selectedPartId}
          selectedPartName={selectedPart.partName}
        />
      ),
      customized: true,
    });

    if (result) {
      navigate('/interview');
    }
  };

  return (
    <BoxButton
      disabled={!allApplicantsScheduled}
      onClick={handleSubmit}
      size="small"
      variant="filledPrimary"
    >
      저장하기
    </BoxButton>
  );
};
