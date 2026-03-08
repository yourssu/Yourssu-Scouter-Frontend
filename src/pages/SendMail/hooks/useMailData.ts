import { useSuspenseQueries } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef } from 'react';

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

  // 템플릿 로드 시 초기 첨부파일 동기화
  const initialSyncRef = useRef(true);
  useEffect(() => {
    if (initialSyncRef.current && templateDetail?.attachments) {
      actions.updateMailContent({ attachments: templateDetail.attachments });
      initialSyncRef.current = false;
    }
  }, [templateDetail, actions]);

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
    (recipientId: string, html: string) => {
      const saved = mailContent.body[recipientId];
      const base = saved ?? defaultContent;

      const isEffectivelyEmpty =
        (base === '' || base === '<p></p>') && (html === '' || html === '<p></p>');

      if (isEffectivelyEmpty || base === html) {
        return;
      }

      actions.updateBody(recipientId, html);
    },
    [defaultContent, mailContent.body, actions],
  );

  return {
    templateDetail,
    currentContent,
    handleContentChange,
    getDisplayVariableValue,
    defaultContent,
  };
};
