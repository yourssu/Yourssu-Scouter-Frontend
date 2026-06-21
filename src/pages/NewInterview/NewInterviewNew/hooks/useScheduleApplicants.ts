import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import { applicantOptions } from '@/query/applicant/options';
import { Applicant } from '@/query/applicant/schema';
import { partOptions } from '@/query/part/options';
import { Part } from '@/query/part/schema';

interface UseScheduleApplicantsReturn {
  allApplicants: Applicant[];
  applicants: Applicant[];
  parts: Part[];
  selectedPart: Part | undefined;
}

/**
 * 일정 생성에 필요한 지원자/파트 데이터를 제공하는 훅입니다.
 * ScheduleCreationView와 SaveScheduleButton에서 공유되어 데이터 중복 페칭을 방지합니다.
 * (React Query의 캐싱으로 실제 네트워크 요청은 중복되지 않지만, 필터링 로직의 중복도 제거됩니다.)
 */
export const useScheduleApplicants = (): UseScheduleApplicantsReturn => {
  const { selectedPartId, selectedSemesterId } = useScheduleCreationContext();

  const { data: parts } = useSuspenseQuery(partOptions());
  const { data: allApplicants } = useSuspenseQuery(
    applicantOptions({
      semesterId: selectedSemesterId ?? undefined,
      state: '심사 진행 중',
    }),
  );

  const selectedPart = parts.find((p) => p.partId === selectedPartId);

  // availableTimes 가 비어있는 지원자는 일정 생성 대상이 아니므로 노출하지 않아요.
  // allApplicants(전체 파트)와 applicants(선택 파트) 모두 동일 기준으로 필터링해서
  // 파트 드롭다운/자동 선택이 지원자 리스트와 엇나가지 않게 해요.
  const eligibleApplicants = useMemo(
    () => allApplicants.filter((a) => a.availableTimes.length > 0),
    [allApplicants],
  );

  const applicants = useMemo(() => {
    return selectedPart
      ? eligibleApplicants.filter((a) => a.part === selectedPart.partName)
      : eligibleApplicants;
  }, [eligibleApplicants, selectedPart]);

  return { parts, allApplicants: eligibleApplicants, applicants, selectedPart };
};

/**
 * draftSchedules에서 특정 지원자의 일정 존재 여부를 O(1)로 확인할 수 있는
 * Set을 제공하는 훅입니다.
 *
 * 이전: hasSchedule()에서 매 렌더링마다 O(n) 선형 탐색
 * 이후: Set.has()로 O(1) 확인
 */
export const useScheduledApplicantIds = (): Set<number> => {
  const { draftSchedules } = useScheduleCreationContext();

  return useMemo(() => new Set(draftSchedules.map((s) => s.applicantId)), [draftSchedules]);
};
