import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { applicantOptions } from '@/query/applicant/options';

export const useVariableValue = () => {
  const { activeApplicantId, variableValue, currentPart } = useMailVariables();

  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId: currentPart?.partId }));

  // 선택된 ID가 없으면 이 파트의 첫 번째 지원자
  const currentId =
    activeApplicantId ?? (applicants?.[0] ? String(applicants[0].applicantId) : undefined);

  // 현재 지원자 찾기
  const currentApplicant = useMemo(() => {
    if (!currentId || !applicants) {
      return null;
    }
    return applicants.find((a) => String(a.applicantId) === currentId);
  }, [currentId, applicants]);

  // 변수 값 채우기
  const getVariableValue = (key: string, perRecipient: boolean, label: string) => {
    // 특수 변수 처리(지원자, 파트명)
    if (label === '지원자') {
      return currentApplicant?.name ?? label;
    }
    if (label === '파트명') {
      return currentPart?.partName;
    }

    // 일반 변수 처리
    if (perRecipient && currentId) {
      return variableValue.perApplicant[currentId]?.[key];
    }
    return variableValue.common[key];
  };

  return { getVariableValue };
};
