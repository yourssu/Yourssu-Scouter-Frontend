import { useSuspenseQueries } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { useMailContentContext, useOptionalMailVariables } from '@/pages/SendMail/context';
import { templateOptions } from '@/query/template/options';

export const useMailData = (
  selectedTemplateId: number | undefined,
  currentId: string | undefined,
) => {
  const { mailContent, actions } = useMailContentContext();
  const results = useSuspenseQueries({
    queries: [...(selectedTemplateId ? [templateOptions.detail(selectedTemplateId)] : [])],
  });
  const templateDetail = results[0]?.data;
  const defaultContent = templateDetail?.content || '';
  const mailVariables = useOptionalMailVariables();

  // 변수 값 치환 함수
  const getDisplayVariableValue = useCallback(
    (key: string, perRecipient: boolean) => {
      if (!mailVariables) {
        return '';
      }

      const { variableValue, currentApplicantId } = mailVariables;

      if (!variableValue) {
        return '';
      }

      if (perRecipient) {
        const firstId = Object.keys(variableValue.perApplicant)[0];
        const recipientId = currentApplicantId ?? firstId;
        return recipientId ? (variableValue.perApplicant[String(recipientId)]?.[key] ?? '') : '';
      }
      return variableValue.common[key] ?? '';
    },
    [mailVariables],
  );

  // 현재 보여줄 내용 계산
  const currentContent = useMemo(() => {
    if (!currentId) {
      return defaultContent;
    }
    return mailContent.body[currentId] ?? defaultContent;
  }, [currentId, mailContent.body, defaultContent]);

  // 내용 변경 핸들러
  const handleContentChange = useCallback(
    (html: string) => {
      if (!currentId) {
        return;
      }

      const saved = mailContent.body[currentId];
      const base = saved ?? defaultContent;

      const isEffectivelyEmpty =
        (base === '' || base === '<p></p>') && (html === '' || html === '<p></p>');

      if (isEffectivelyEmpty || base === html) {
        return;
      }

      actions.updateBody(currentId, html);
    },
    [currentId, defaultContent, mailContent.body, actions],
  );

  // 수정된 내용, 변수 값이 반영된 최종 본문
  const resolvedBody = useMemo(() => {
    if (!currentId) {
      return defaultContent;
    }
    return mailContent.body[currentId] ?? defaultContent;
  }, [currentId, mailContent.body, defaultContent]);

  return {
    templateDetail,
    currentContent,
    resolvedBody,
    handleContentChange,
    getDisplayVariableValue,
    defaultContent,
  };
};
