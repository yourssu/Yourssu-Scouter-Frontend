import { useRef, useState } from 'react';

import { getChipType } from '@/components/VariableChip/VariableChip';
import { VariableType } from '@/components/VariableDialog/VariableDialog'; // 추가

import { Recipient, RecipientId } from '../mail.type';
import { MailEditorContent, MailEditorContentRef } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}

export const MailEditor = () => {
  const [editorContents, setEditorContents] = useState<Record<RecipientId, string>>({
    'recipient-0': '',
    'recipient-1': '',
    'recipient-2': '',
  });

  const [activeRecipient, setActiveRecipient] = useState<RecipientId>('recipient-0');

  const [variables, setVariables] = useState<Variable[]>([
    { id: '1', type: '텍스트', name: '파트명', differentForEachPerson: false },
    { id: '2', type: '사람', name: '지원자', differentForEachPerson: true },
  ]);

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
      const chipType = getChipType(variable.type, variable.name);
      editorRef.current.insertVariable(chipType, variable.name);
    }
  };

  const handleVariableAdd = (type: VariableType, name: string, differentForEachPerson: boolean) => {
    const newVariable: Variable = {
      id: Date.now().toString(),
      type,
      name,
      differentForEachPerson,
    };

    setVariables((prev) => [...prev, newVariable]);

    editorRef.current?.insertVariable(
      getChipType(newVariable.type, newVariable.name),
      newVariable.name,
    );
  };

  const handleVariableDelete = (variable: Variable) => {
    // console.log('Attempting to delete variable:', variable);
    if (editorRef.current) {
      setVariables((prev) => prev.filter((v) => v.id !== variable.id));
      editorRef.current.deleteVariable(variable.name);
      // console.log('Variable deleted from editor:', variable);
    }
  };

  return (
    <>
      <EditorContainer>
        <MailHeader
          onVariableAdd={handleVariableAdd}
          onVariableClick={handleVariableClick}
          onVariableDelete={handleVariableDelete}
          type="normal"
          variables={variables}
        />
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
