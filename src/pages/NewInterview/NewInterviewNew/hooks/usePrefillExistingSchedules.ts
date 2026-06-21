import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import { useScheduleApplicants } from '@/pages/NewInterview/NewInterviewNew/hooks/useScheduleApplicants';
import { convertSchedulesToDrafts } from '@/pages/NewInterview/NewInterviewNew/utils/existingSchedules';
import { scheduleOptions } from '@/query/schedule/options';

/**
 * 파트가 선택되면 해당 파트의 기존 면접 일정을 불러와 draft 일정으로 미리 채워요.
 *
 * - 파트가 바뀔 때만(prefilledPartRef 가드) 채워서, 사용자가 드래그로 편집한 내용을
 *   이후 리렌더에서 덮어쓰지 않아요.
 * - `useSuspenseQuery`는 enabled를 강제하므로, 파트 선택 전엔 조회 자체를 안 하도록
 *   `useQuery` + `enabled` 게이트를 사용해요.
 * - `Schedule`에 applicantId가 없어 name+part 매칭으로 변환해요. (utils/existingSchedules)
 */
export const usePrefillExistingSchedules = () => {
  const { selectedPartId, setDraftSchedules } = useScheduleCreationContext();
  const { applicants } = useScheduleApplicants();

  const { data: schedules, isPending } = useQuery({
    ...scheduleOptions(selectedPartId),
    enabled: selectedPartId !== null,
  });

  const lastPrefilledPart = useRef<null | number>(null);

  useEffect(() => {
    if (selectedPartId === null) {
      lastPrefilledPart.current = null;
      return;
    }

    // 이미 이 파트에 대해 채운 적이면 사용자 편집 보존을 위해 건너뛰어요.
    if (lastPrefilledPart.current === selectedPartId) {
      return;
    }

    if (!schedules) {
      return;
    }

    setDraftSchedules(convertSchedulesToDrafts(schedules, applicants, selectedPartId));
    lastPrefilledPart.current = selectedPartId;
  }, [selectedPartId, schedules, applicants, setDraftSchedules]);

  // 파트 선택 후 기존 일정을 불러오는 중인지 여부.
  // 이때 캘린더를 로딩 표시로 대체해 갑자기 일정이 채워지는 점프를 막고,
  // 불러오는 동안 드래그로 만든 draft가 도착 후 prefill에 덮어씌워지는 레이스도 방지해요.
  const isLoading = selectedPartId !== null && isPending;

  return { isLoading };
};
