import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailVariableContext } from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options';
import { templateOptions } from '@/query/template/options';

export const useMailValidation = (templateId?: number) => {
  const { variableValue, currentPart } = useMailVariableContext();

  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId: currentPart?.partId }));
  const results = useSuspenseQueries({
    queries: [...(templateId ? [templateOptions.detail(templateId)] : [])],
  });
  const template = results[0]?.data;

  const isReadyForReservation = useMemo(() => {
    if (!template || !applicants || !templateId) {
      return false;
    }

    // 필터링된 실제 입력 필요 변수들
    const requiredVariables = template.variables.filter(
      (v) => !['지원자', '파트명'].includes(v.displayName),
    );

    if (requiredVariables.length === 0) {
      return true;
    }

    // 모든 변수에 값이 채워졌는지 확인
    return requiredVariables.every((v) => {
      if (v.perRecipient) {
        // 개별 변수: 모든 지원자에 대해 값이 있는지 확인
        return applicants.every((a) => {
          const val = variableValue.perApplicant[String(a.applicantId)]?.[v.key];
          return val && val.trim() !== '';
        });
      }
      // 공통 변수: 값이 있는지 확인
      const commonVal = variableValue.common[v.key];
      return commonVal && commonVal.trim() !== '';
    });
  }, [template, applicants, variableValue, templateId]);

  return { isReadyForReservation };
};
