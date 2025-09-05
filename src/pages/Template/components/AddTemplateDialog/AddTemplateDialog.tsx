import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { useRef, useState } from 'react';

import { getChipType } from '@/components/VariableChip/VariableChip';
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
} from './AddTemplateDialog.style';

interface Template {
  content?: string;
  date: string;
  id: number;
  title: string;
}

// 추가: Variable 인터페이스
interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}

interface AddTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<Template, 'date' | 'id'>) => void;
}

export const AddTemplateDialog = ({ isOpen, onClose, onSave }: AddTemplateDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const editorRef = useRef<MailEditorContentRef>(null); // 추가

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave({
        title: formData.title.trim(),
        content: formData.content,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
    });
    onClose();
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

  // 추가: MailHeader에서 변수 클릭 시 에디터에 삽입
  const handleVariableClick = (variable: Variable) => {
    if (editorRef.current) {
      const chipType = getChipType(variable.type, variable.name);
      editorRef.current.insertVariable(chipType, variable.name);
    }
  };

  return (
    <Dialog.Root onOpenChange={handleClose} open={isOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <Dialog.Title style={{ display: 'none' }} />
          <Dialog.Description style={{ display: 'none' }} />
          <StyledHeader>
            <StyledTitleInput
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              value={formData.title}
            />
            <IcCloseLine onClick={onClose} />
          </StyledHeader>
          <StyledBody>
            <MailHeader onVariableClick={handleVariableClick} type="normal" />
            <MailEditorContent
              initialContent={formData.content}
              onContentChange={handleContentChange}
              ref={editorRef} // 추가
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
