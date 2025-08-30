import { Dialog } from 'radix-ui';
import { useState } from 'react';
import {
  StyledOverlay,
  StyledContent,
  StyledHeader,
  StyledBody,
  StyledFooter,
  StyledTitleInput,
} from './AddTemplateDialog.style';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { MailEditorContent } from '@/pages/SendMail/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/MailHeader/MailHeader';

interface Template {
  id: number;
  title: string;
  date: string;
  content?: string;
}

interface AddTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<Template, 'id' | 'date'>) => void; // id, date 제외
}

export const AddTemplateDialog = ({
  isOpen,
  onClose,
  onSave,
}: AddTemplateDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

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
    // 폼 데이터 초기화
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

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledHeader>
            <StyledTitleInput
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
            />
            <IcCloseLine onClick={onClose} />
          </StyledHeader>

          <StyledBody>
            <MailHeader type="normal" />
            <MailEditorContent
              initialContent={formData.content}
              onContentChange={handleContentChange}
            />
          </StyledBody>

          <StyledFooter>
            <BoxButton
              size="large"
              variant="filledPrimary"
              onClick={handleSave}
              disabled={!formData.title.trim()}
            >
              저장하기
            </BoxButton>
          </StyledFooter>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
