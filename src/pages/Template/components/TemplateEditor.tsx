import { useRef } from 'react';

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
  onVariablesChange: (variables: Variable[]) => void;
  templateContent: string;
  templateVariables: Variable[];
}

export const TemplateEditor = ({
  templateContent,
  templateVariables,
  onContentChange,
  onVariablesChange,
}: TemplateEditorProps) => {
  const editorRef = useRef<MailEditorContentRef>(null);

  const handleVariableClick = (variable: Variable) => {
    if (editorRef.current) {
      const chipType = getChipType(variable.type);
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

    onVariablesChange([...templateVariables, newVariable]);
  };

  const handleVariableDelete = (variable: Variable) => {
    if (editorRef.current) {
      onVariablesChange(templateVariables.filter((v) => v.id !== variable.id));
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
          variables={templateVariables}
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
