import { useState } from 'react';

import { Recipient, RecipientId } from '../mail.type';
import { MailEditorContent } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

export const MailEditor = () => {
  const [editorContents, setEditorContents] = useState<Record<RecipientId, string>>({
    'recipient-0': '',
    'recipient-1': '',
    'recipient-2': '',
  });

  const [activeRecipient, setActiveRecipient] = useState<RecipientId>('recipient-0');

  // 나중에 api로 데이터 받아옴
  const recipients: Recipient[] = [
    { id: 'recipient-0', name: '김솔미' },
    { id: 'recipient-1', name: '김지은' },
    { id: 'recipient-2', name: '이수빈' },
  ];

  const handleTabChange = (id: RecipientId) => {
    setActiveRecipient(id);
  };

  const activeRecipientName = recipients.find((r) => r.id === activeRecipient)?.name;

  const handleContentChange = (html: string) => {
    setEditorContents((prev) => ({
      ...prev,
      [activeRecipient]: html,
    }));
  };

  return (
    <>
      <EditorContainer>
        <MailHeader type="normal" />
        <MailEditorContent />
      </EditorContainer>

      <EditorContainer>
        <MailHeader onTabChange={handleTabChange} recipients={recipients} type="tabs" />
        <MailEditorContent
          initialContent={editorContents[activeRecipient]}
          key={activeRecipient}
          onContentChange={handleContentChange}
          recipientName={activeRecipientName}
        />
      </EditorContainer>
    </>
  );
};
