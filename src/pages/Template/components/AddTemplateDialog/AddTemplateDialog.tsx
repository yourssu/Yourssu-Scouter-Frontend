import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { useState } from 'react';

import { MailContentProvider } from '@/pages/SendMail/context';
import { TemplateEditor } from '@/pages/Template/components/TemplateEditor';
import { getDefaultVariables, Variable } from '@/types/editor';
import { Template } from '@/types/template';
import { AttachmentType } from '@/utils/buildMailRequest';

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
    variables: getDefaultVariables(),
    attachments: [] as AttachmentType[],
  });

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave({
        title: formData.title.trim(),
        content: formData.content,
        variables: formData.variables,
        attachments: formData.attachments,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      variables: getDefaultVariables(),
      attachments: [],
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

  const handleVariablesChange = (variables: Variable[]) => {
    setFormData((prev) => ({
      ...prev,
      variables,
    }));
  };

  const handleAttachmentsChange = (attachments: AttachmentType[]) => {
    setFormData((prev) => ({
      ...prev,
      attachments,
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
            <MailContentProvider>
              <TemplateEditor
                onAttachmentsChange={handleAttachmentsChange}
                onContentChange={handleContentChange}
                onVariablesChange={handleVariablesChange}
                templateAttachments={formData.attachments}
                templateContent={formData.content}
                templateVariables={formData.variables}
              />
            </MailContentProvider>
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
