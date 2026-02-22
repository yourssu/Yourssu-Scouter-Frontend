import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { useEffect, useState } from 'react';

import { MailContentProvider } from '@/pages/SendMail/context';
import { TemplateEditor } from '@/pages/Template/components/TemplateEditor';
import { templateOptions } from '@/query/template/options';
import { Variable } from '@/types/editor';
import { Template } from '@/types/template';
import { AttachmentType } from '@/utils/buildMailRequest';

import {
  StyledBody,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledOverlay,
  StyledTitleInput,
} from './EditTemplateDialog.style';

interface EditTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
  templateId: number;
}

export const EditTemplateDialog = ({
  isOpen,
  onClose,
  onSave,
  templateId,
}: EditTemplateDialogProps) => {
  const { data: templateDetail } = useSuspenseQuery(templateOptions.detail(templateId));

  const [formData, setFormData] = useState({
    title: templateDetail.title,
    content: templateDetail.content,
    variables: templateDetail.variables,
    attachments: templateDetail.attachments || [],
  });

  // templateDetail이 변경될 때 폼 데이터 업데이트
  useEffect(() => {
    setFormData({
      title: templateDetail.title,
      content: templateDetail.content,
      variables: templateDetail.variables,
      attachments: templateDetail.attachments || [],
    });
  }, [templateDetail]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      return;
    }
    onSave({
      ...templateDetail,
      title: formData.title.trim(),
      content: formData.content,
      variables: formData.variables,
      attachments: formData.attachments,
    });
    onClose();
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
