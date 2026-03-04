import { Suspense } from 'react';

import { useMailData } from '@/pages/SendMail/hooks/useMailData';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';

import { MailEditorContent } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

interface MailEditorProps {
  readOnly?: boolean;
  selectedTemplateId?: number;
}

export const MailEditor = ({ readOnly, selectedTemplateId }: MailEditorProps) => {
  // 메일 받을 지원자 정보
  const { recipients, currentRecipientId, currentRecipientName, setCurrentRecipientId } =
    useRecipientData();

  // 현재 선택된 지원자에 맞는 본문과 변경 핸들러
  const { currentContent, handleContentChange } = useMailData(
    selectedTemplateId,
    currentRecipientId,
  );

  return (
    <EditorContainer>
      {recipients.length > 0 && (
        <MailHeader
          activeTabId={currentRecipientId}
          onTabChange={setCurrentRecipientId}
          recipients={recipients}
          type="tabs"
        />
      )}
      <div className="flex min-h-0 flex-1 flex-col">
        <Suspense fallback={<div>에디터 로딩 중...</div>}>
          <MailEditorContent
            currentApplicantId={currentRecipientId}
            initialContent={currentContent}
            key={`${selectedTemplateId}-${currentRecipientId}`}
            onContentChange={handleContentChange}
            readOnly={readOnly}
            recipientName={currentRecipientName}
          />
        </Suspense>
      </div>
    </EditorContainer>
  );
};
