import { useSuspenseQueries } from '@tanstack/react-query';

import { useOptionalMailVariables } from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options';

export const useVariableValue = () => {
  const context = useOptionalMailVariables();

  const results = useSuspenseQueries({
    queries: [...(context ? [applicantOptions({ partId: context.currentPart?.partId })] : [])],
  });
  const applicants = results[0]?.data;

  // 선택된 ID가 없으면 이 파트의 첫 번째 지원자
  const currentId =
    context?.currentApplicantId ??
    (applicants?.[0] ? String(applicants[0].applicantId) : undefined);

  // 변수 값 채우기
  const getVariableValue = (
    key: string,
    perRecipient: boolean,
    label: string,
    targetId?: string,
  ) => {
    if (!context) {
      return '';
    }
    const { variableValue, currentPart } = context;
    const id = targetId || currentId;
    const targetApplicant = applicants?.find((a) => String(a.applicantId) === id);

    // 특수 변수 처리(지원자, 파트명)
    if (label === '지원자') {
      return targetApplicant?.name ?? label;
    }
    if (label === '파트명') {
      return currentPart?.partName;
    }

    // 일반 변수 처리
    if (perRecipient && id) {
      return variableValue.perApplicant[id]?.[key];
    }
    return variableValue.common[key];
  };

  return { getVariableValue };
};
