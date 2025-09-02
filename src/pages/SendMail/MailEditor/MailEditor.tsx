import { VariableType } from '@/components/VariableDialog/VariableDialog'; // 추가
import { useRef, useState } from 'react';
import { Recipient, RecipientId } from '../mail.type';
import { MailEditorContent, MailEditorContentRef } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

interface Variable {
  id: string;
  type: VariableType;
  name: string;
  differentForEachPerson: boolean;
}

// 추가: VariableType을 ChipType으로 매핑
const typeMapping: Record<VariableType, string> = {
  사람: 'applicant',
  날짜: 'date',
  링크: 'link',
  텍스트: 'part',
};

export const MailEditor = () => {
  const [editorContents, setEditorContents] = useState<Record<RecipientId, string>>({
    'recipient-0': '',
    'recipient-1': '',
    'recipient-2': '',
  });

  const [activeRecipient, setActiveRecipient] = useState<RecipientId>('recipient-0');

  const editorRef = useRef<MailEditorContentRef>(null);

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

  const handleVariableClick = (variable: Variable) => {
    if (editorRef.current) {
      const chipType = typeMapping[variable.type];
      editorRef.current.insertVariable(chipType, variable.name);
      console.log('Variable inserted into editor:', variable);
    }
  };

  return (
    <>
      <EditorContainer>
        <MailHeader type="normal" onVariableClick={handleVariableClick} />
        <MailEditorContent ref={editorRef} />
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
