import { useSuspenseQueries } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useMemo, useState } from 'react';

import { useMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { applicantOptions } from '@/query/applicant/options';
import { Part } from '@/query/part/schema';
import { templateOptions } from '@/query/template/options';

import { Recipient } from '../../mail.type';
import { MailEditorContent } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

interface MailEditorProps {
  selectedPart: Part;
  selectedTemplateId?: number;
}

export const MailEditor = ({ selectedPart, selectedTemplateId }: MailEditorProps) => {
  const { activeApplicantId, actions } = useMailVariables();
  const [editorContents, setEditorContents] = useState<Record<string, string>>({});

  const results = useSuspenseQueries({
    queries: [
      applicantOptions({ partId: selectedPart.partId }),
      ...(selectedTemplateId ? [templateOptions.detail(selectedTemplateId)] : []),
    ],
  });

  const applicants = results[0].data;
  const templateDetail = results[1]?.data;

  // 지원자 목록 생성
  const recipients: Recipient[] = useMemo(
    () =>
      Array.isArray(applicants)
        ? applicants.map((a) => ({ id: String(a.applicantId), name: a.name }))
        : [],
    [applicants],
  );

  // 현재 선택된 ID (없으면 1번 지원자)
  const currentId = activeApplicantId ?? recipients[0]?.id;
  const activeRecipientName = recipients.find((r) => r.id === currentId)?.name;

  // 탭 변경 시 컨텍스트 상태 업데이트
  const handleTabChange = (id: string) => {
    actions.setActiveApplicantId(id);
  };

  // 에디터 내용 변경 핸들러
  const handleContentChange = (html: string) => {
    if (!currentId) {
      return;
    }

    // 현재 저장된 값과 기본 템플릿
    const saved = editorContents[currentId];
    const template = templateDetail?.content;

    // 기준점
    const base = saved ?? template ?? '';

    // 둘 다 비어있는지 확인
    const isEffectivelyEmpty =
      (base === '' || base === '<p></p>') && (html === '' || html === '<p></p>');

    // 변경 사항이 없으면 업데이트하지 않음
    if (isEffectivelyEmpty || base === html) {
      return;
    }

    setEditorContents((prev) => {
      const baseContent = prev[currentId] ?? templateDetail?.content ?? '';
      if (baseContent === html) {
        return prev;
      }

      return {
        ...prev,
        [currentId]: html,
      };
    });
  };

  // 현재 지원자의 에디터 내용 계산 (useMemo로 최적화)
  const currentContent = useMemo(() => {
    return editorContents[currentId] ?? templateDetail?.content ?? '';
  }, [currentId, editorContents, templateDetail?.content]);

  return (
    <EditorContainer>
      <MailHeader
        activeTabId={currentId}
        onTabChange={handleTabChange}
        recipients={recipients}
        type="tabs"
      />
      <Suspense fallback={<div>에디터 로딩 중...</div>}>
        <MailEditorContent
          initialContent={currentContent}
          key={currentId} // 탭 변경 시 컴포넌트 리렌더링을 위한 key 설정
          onContentChange={handleContentChange}
          recipientName={activeRecipientName}
        />
      </Suspense>
    </EditorContainer>
  );
};
