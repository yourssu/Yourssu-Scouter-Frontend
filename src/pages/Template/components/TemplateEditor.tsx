import { useRef } from 'react';

import { getChipType } from '@/components/VariableChip/utils';
import {
  MailEditorContent,
  MailEditorContentRef,
} from '@/pages/SendMail/components/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/components/MailHeader/MailHeader';
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
      editorRef.current.insertVariable(variable.key, chipType, variable.displayName);
    }
  };

  const handleVariableAdd = (type: VariableType, displayName: string, perRecipient: boolean) => {
    const newVariable: Variable = {
      key: `var-${crypto.randomUUID()}`,
      type,
      displayName,
      perRecipient,
      items: type === '사람' ? [] : [{ value: '' }],
    };

    onVariablesChange([...templateVariables, newVariable]);
  };

  const handleVariableDelete = (variable: Variable) => {
    if (editorRef.current) {
      onVariablesChange(templateVariables.filter((v) => v.key !== variable.key));
      editorRef.current.deleteVariable(variable.key);
    }
  };

  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-[690px] w-[1160px] flex-col rounded-xl border">
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
    </div>
  );
};
