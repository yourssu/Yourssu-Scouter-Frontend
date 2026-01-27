import { useSuspenseQueries } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { useOptionalMailVariables } from '@/pages/SendMail/context';
import { templateOptions } from '@/query/template/options';

export const useMailData = (
  selectedTemplateId: number | undefined,
  currentId: string | undefined,
) => {
  const results = useSuspenseQueries({
    queries: [...(selectedTemplateId ? [templateOptions.detail(selectedTemplateId)] : [])],
  });
  const templateDetail = results[0]?.data;
  const defaultContent = templateDetail?.content || '';
  const mailVariables = useOptionalMailVariables();

  // 에디터 내용 상태 관리
  const [editorContents, setEditorContents] = useState<Record<string, string>>({});

  // 변수 값 치환 함수
  const getDisplayVariableValue = useCallback(
    (key: string, perRecipient: boolean) => {
      if (!mailVariables) {
        return '';
      }

      const { variableValue, activeApplicantId } = mailVariables;

      if (!variableValue) {
        return '';
      }

      if (perRecipient) {
        const firstId = Object.keys(variableValue.perApplicant)[0];
        const recipientId = activeApplicantId ?? firstId;
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
    return editorContents[currentId] ?? defaultContent;
  }, [currentId, editorContents, defaultContent]);

  // 내용 변경 핸들러
  const handleContentChange = useCallback(
    (html: string) => {
      if (!currentId) {
        return;
      }

      const saved = editorContents[currentId];
      const base = saved ?? defaultContent;

      const isEffectivelyEmpty =
        (base === '' || base === '<p></p>') && (html === '' || html === '<p></p>');

      if (isEffectivelyEmpty || base === html) {
        return;
      }

      setEditorContents((prev) => {
        if (prev[currentId] === html) {
          return prev;
        }
        return { ...prev, [currentId]: html };
      });
    },
    [currentId, defaultContent, editorContents],
  );

  return {
    templateDetail,
    currentContent,
    handleContentChange,
    getDisplayVariableValue,
    defaultContent,
  };
};
