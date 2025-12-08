import { useRef, useState } from 'react';

import { getChipType } from '@/components/VariableChip/utils';
import { Variable, VariableType } from '@/types/editor';
import { defaultVariables } from '@/types/editor';

import { Recipient, RecipientId } from '../mail.type';
import { MailEditorContent, MailEditorContentRef } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

export const MailEditor = () => {
  const [editorContents, setEditorContents] = useState<Record<RecipientId, string>>({
    'recipient-0': '',
    'recipient-1': '',
    'recipient-2': '',
  });

  const [activeRecipient, setActiveRecipient] = useState<RecipientId>('recipient-0');

  const [variables, setVariables] = useState<Variable[]>(defaultVariables); // 메일 페이지 작업 시 수정

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
      const chipType = getChipType(variable.type);
      editorRef.current.insertVariable(variable.key, chipType, variable.displayName);
    }
  };

  const handleVariableAdd = (type: VariableType, displayName: string, perRecipient: boolean) => {
    const newVariable: Variable = {
      key: `var-${crypto.randomUUID()}`,
      type,
      displayName,
      perRecipient,
      isFixed: false,
    };

    setVariables((prev) => [...prev, newVariable]);

    editorRef.current?.insertVariable(
      newVariable.key,
      getChipType(newVariable.type),
      newVariable.displayName,
    );
  };

  const handleVariableDelete = (variable: Variable) => {
    if (!variable.isFixed) {
      if (editorRef.current) {
        setVariables((prev) => prev.filter((v) => v.key !== variable.key));
        editorRef.current.deleteVariable(variable.displayName);
      }
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
