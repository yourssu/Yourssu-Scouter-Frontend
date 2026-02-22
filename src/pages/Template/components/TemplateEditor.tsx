import { useEffect, useRef } from 'react';

import { getChipType } from '@/components/VariableChip/utils';
import {
  MailEditorContent,
  MailEditorContentRef,
} from '@/pages/SendMail/components/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/components/MailHeader/MailHeader';
import { useMailContentContext } from '@/pages/SendMail/context';
import { Variable, VariableType } from '@/types/editor';
import { AttachmentType } from '@/utils/buildMailRequest';

interface TemplateEditorProps {
  onAttachmentsChange?: (attachments: AttachmentType[]) => void;
  onContentChange: (content: string) => void;
  onVariablesChange: (variables: Variable[]) => void;
  templateAttachments?: AttachmentType[];
  templateContent: string;
  templateVariables: Variable[];
}

export const TemplateEditor = ({
  templateAttachments = [],
  templateContent,
  templateVariables,
  onAttachmentsChange,
  onContentChange,
  onVariablesChange,
}: TemplateEditorProps) => {
  const editorRef = useRef<MailEditorContentRef>(null);
  const { mailContent, actions } = useMailContentContext();
  const initialMount = useRef(true);

  // 컨텍스트에 초기 첨부파일 상태 세팅
  useEffect(() => {
    if (initialMount.current) {
      actions.updateMailContent({ attachments: templateAttachments });
      initialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 컨텍스트의 첨부파일 상태가 바뀌면 상위로 이벤트 전달
  useEffect(() => {
    if (!initialMount.current && onAttachmentsChange) {
      onAttachmentsChange(mailContent.attachments);
    }
  }, [mailContent.attachments, onAttachmentsChange]);

  const handleVariableClick = (variable: Variable) => {
    if (editorRef.current) {
      const chipType = getChipType(variable.type);
      editorRef.current.insertVariable(
        variable.key,
        chipType,
        variable.displayName,
        variable.perRecipient,
      );
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
    editorRef.current?.insertVariable(
      newVariable.key,
      getChipType(newVariable.type),
      newVariable.displayName,
      newVariable.perRecipient,
    );
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
