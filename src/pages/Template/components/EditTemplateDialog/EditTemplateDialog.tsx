import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { useEffect, useState } from 'react';

import { TemplateEditor } from '@/pages/Template/components/TemplateEditor';

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

export const EditTemplateDialog = ({
  isOpen,
  onClose,
  onSave,
  template,
}: EditTemplateDialogProps) => {
  const [formData, setFormData] = useState({
    title: template ? template.title : '',
    content: template ? template.content : '',
  });

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

  if (!template) {
    return null;
  }

  return (
    <Dialog.Root onOpenChange={handleClose} open={isOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <StyledHeader>
            <VisuallyHidden>
              <Dialog.Title />
              <Dialog.Description />
            </VisuallyHidden>
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
              templateContent={template.content ?? ''}
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
