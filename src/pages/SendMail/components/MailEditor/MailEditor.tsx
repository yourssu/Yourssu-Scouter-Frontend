import { useSuspenseQueries } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useMemo } from 'react';

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
          // 사용자가 수정한 내용이 있으면 그걸 보여주고, 없으면 템플릿 기본값 사용
          initialContent={templateDetail?.content || ''}
          key={currentId} // ID가 바뀔 때마다 에디터를 새로 그려서 내용을 교체함
          recipientName={activeRecipientName}
        />
      </Suspense>
    </EditorContainer>
  );
};
