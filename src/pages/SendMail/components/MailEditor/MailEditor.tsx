import { Suspense } from 'react';

import { useMailContentContext } from '@/pages/SendMail/context';
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
  const { recipients, currentRecipientId, setCurrentRecipientId } = useRecipientData();

  // 현재 선택된 지원자에 맞는 본문과 변경 핸들러
  const { defaultContent, handleContentChange } = useMailData(
    selectedTemplateId,
    currentRecipientId,
  );

  const { mailContent } = useMailContentContext();

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
        {recipients.map((recipient) => (
          <div
            className="h-full flex-col"
            key={recipient.id}
            style={{ display: recipient.id === currentRecipientId ? 'flex' : 'none' }}
          >
            <Suspense fallback={null}>
              <MailEditorContent
                initialContent={mailContent.body[recipient.id] ?? defaultContent}
                onContentChange={(html: string) => handleContentChange(recipient.id, html)}
                readOnly={readOnly}
                recipientName={recipient.name}
              />
            </Suspense>
          </div>
        ))}
      </div>
    </EditorContainer>
  );
};
