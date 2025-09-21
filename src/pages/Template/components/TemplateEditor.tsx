import { useRef, useState } from 'react';

import { getChipType } from '@/components/VariableChip/utils';
import { EditorContainer } from '@/pages/SendMail/MailEditor/MailEditor.style';
import {
  MailEditorContent,
  MailEditorContentRef,
} from '@/pages/SendMail/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/MailHeader/MailHeader';
import { Variable, VariableType } from '@/types/editor';

interface TemplateEditorProps {
  onContentChange: (content: string) => void;
  templateContent: string;
}

export const TemplateEditor = ({ templateContent, onContentChange }: TemplateEditorProps) => {
  const [variables, setVariables] = useState<Variable[]>([
    { id: '1', type: '텍스트', name: '파트명', differentForEachPerson: false },
    { id: '2', type: '사람', name: '지원자', differentForEachPerson: true },
  ]);

  const editorRef = useRef<MailEditorContentRef>(null);

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
  };

  const handleVariableDelete = (variable: Variable) => {
    if (editorRef.current) {
      setVariables((prev) => prev.filter((v) => v.id !== variable.id));
      editorRef.current.deleteVariable(variable.name);
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
        <MailEditorContent
          initialContent={templateContent}
          onContentChange={onContentChange}
          ref={editorRef}
        />
      </EditorContainer>
    </>
  );
};
