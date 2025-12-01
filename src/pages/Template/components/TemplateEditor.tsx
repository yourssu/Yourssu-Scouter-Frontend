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
      editorRef.current.insertVariable(variable.id, chipType, variable.name);
    }
  };

  const handleVariableAdd = (type: VariableType, name: string, differentForEachPerson: boolean) => {
    const newVariable: Variable = {
      id: `var-${Date.now().toString()}`,
      type,
      name,
      differentForEachPerson,
      isFixed: false,
    };

    onVariablesChange([...templateVariables, newVariable]);
  };

  const handleVariableDelete = (variable: Variable) => {
    if (!variable.isFixed) {
      if (editorRef.current) {
        onVariablesChange(templateVariables.filter((v) => v.id !== variable.id));
        editorRef.current.deleteVariable(variable.id);
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
