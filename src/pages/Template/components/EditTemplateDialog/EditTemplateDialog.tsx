import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { useEffect, useRef, useState } from 'react';

import { VariableType } from '@/components/VariableDialog/VariableDialog';
import {
  MailEditorContent,
  MailEditorContentRef,
} from '@/pages/SendMail/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/MailHeader/MailHeader';

import {
  StyledBody,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledOverlay,
  StyledTitleInput,
} from './EditTemplateDialog.style';

interface Template {
  content?: string;
  date: string;
  id: number;
  title: string;
}

interface EditTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
  template: null | Template;
}

interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}

const typeMapping: Record<VariableType, string> = {
  사람: 'applicant',
  날짜: 'date',
  링크: 'link',
  텍스트: 'part',
};

export const EditTemplateDialog = ({
  isOpen,
  onClose,
  onSave,
  template,
}: EditTemplateDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const editorRef = useRef<MailEditorContentRef>(null);

  // template이 변경될 때 폼 데이터 업데이트
  useEffect(() => {
    if (template) {
      setFormData({
        title: template.title,
        content: template.content || '',
      });
    }
  }, [template]);

  const handleSave = () => {
    if (template && formData.title.trim()) {
      onSave({
        ...template,
        title: formData.title.trim(),
        content: formData.content,
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    // 폼 데이터 리셋은 useEffect에서 다음 열릴 때 처리됨
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleVariableClick = (variable: Variable) => {
    if (editorRef.current) {
      const chipType = typeMapping[variable.type];
      editorRef.current.insertVariable(chipType, variable.name);
      console.log('Variable inserted into editor:', variable);
    }
  };

  if (!template) {return null;}

  return (
    <Dialog.Root onOpenChange={handleClose} open={isOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledHeader>
            <Dialog.Title style={{ display: 'none' }} />
            <Dialog.Description style={{ display: 'none' }} />
            <StyledTitleInput
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              value={template.title}
            />
            <IcCloseLine onClick={onClose} />
          </StyledHeader>

          <StyledBody>
            <MailHeader onVariableClick={handleVariableClick} type="normal" />
            <MailEditorContent
              initialContent={template.content}
              onContentChange={handleContentChange}
              ref={editorRef}
            />
          </StyledBody>

          <StyledFooter>
            <BoxButton
              disabled={!formData.title.trim()}
              onClick={handleSave}
              size="large"
              variant="filledPrimary"
            >
              저장하기
            </BoxButton>
          </StyledFooter>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
