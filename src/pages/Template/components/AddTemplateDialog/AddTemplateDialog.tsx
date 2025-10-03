import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { useState } from 'react';

import { TemplateEditor } from '@/pages/Template/components/TemplateEditor';
import { Template } from '@/types/template';

import {
  StyledBody,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledOverlay,
  StyledTitleInput,
} from './AddTemplateDialog.style';

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

  return (
    <Dialog.Root onOpenChange={handleClose} open={isOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <VisuallyHidden>
            <Dialog.Title />
            <Dialog.Description />
          </VisuallyHidden>
          <StyledHeader>
            <StyledTitleInput
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              value={formData.title}
            />
            <IcCloseLine onClick={onClose} />
          </StyledHeader>
          <StyledBody>
            <TemplateEditor
              onContentChange={handleContentChange}
              templateContent={formData.content}
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
