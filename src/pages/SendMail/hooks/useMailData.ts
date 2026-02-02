import { useSuspenseQueries } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { templateOptions } from '@/query/template/options';

export const useMailData = (selectedTemplateId: number | undefined) => {
  const results = useSuspenseQueries({
    queries: [...(selectedTemplateId ? [templateOptions.detail(selectedTemplateId)] : [])],
  });
  const templateDetail = results[0]?.data;
  const { variableValue, activeApplicantId } = useMailVariables();

  const getDisplayVariableValue = useCallback(
    (key: string, perRecipient: boolean) => {
      if (!variableValue) {
        return '';
      }

      if (perRecipient) {
        const firstId = Object.keys(variableValue.perApplicant)[0];
        const recipientId = activeApplicantId ?? firstId;

        // 값이 없을 경우 빈 문자열 반환
        return recipientId ? (variableValue.perApplicant[String(recipientId)]?.[key] ?? '') : '';
      }

      return variableValue.common[key] ?? '';
    },
    [variableValue, activeApplicantId],
  );

  return {
    defaultContent: templateDetail?.content || '',
    templateVariables: templateDetail?.variables,
    getDisplayVariableValue,
  };
};
