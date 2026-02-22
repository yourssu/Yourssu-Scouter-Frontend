import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailVariableContext } from '@/pages/SendMail/context';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { templateOptions } from '@/query/template/options';

export const useMailValidation = (templateId?: number) => {
  const { variableValue } = useMailVariableContext();

  // 칩 리스트(받는 사람)에 실제 포함된 지원자들
  const { recipients } = useRecipientData();

  const results = useSuspenseQueries({
    queries: [...(templateId ? [templateOptions.detail(templateId)] : [])],
  });
  const template = results[0]?.data;

  const isReadyForReservation = useMemo(() => {
    if (!template || !templateId) {
      return false;
    }

    const requiredVariables = template.variables.filter(
      (v) => !['지원자', '파트명'].includes(v.displayName),
    );

    if (requiredVariables.length === 0) {
      return true;
    }

    return requiredVariables.every((v) => {
      if (v.perRecipient) {
        return recipients.every((r) => {
          const val = variableValue.perApplicant[r.id]?.[v.key];
          return val && val.trim() !== '';
        });
      }

      const commonVal = variableValue.common[v.key];
      return commonVal && commonVal.trim() !== '';
    });
  }, [template, recipients, variableValue, templateId]);

  return { isReadyForReservation };
};
