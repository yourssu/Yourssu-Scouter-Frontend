import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';

import {
  ButtonContainer,
  StyledContent,
  StyledDescription,
  StyledHeader,
  StyledOverlay,
  StyledTitle,
} from './DeleteTemplateDialog.style';

interface DeleteTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  templateTitle: string;
}

export const DeleteTemplateDialog = ({
  isOpen,
  onClose,
  onConfirm,
  templateTitle,
}: DeleteTemplateDialogProps) => {
  const handleDelete = () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog.Root onOpenChange={onClose} open={isOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledHeader>
            <StyledTitle>이 템플릿을 삭제하시겠습니까?</StyledTitle>
            <VisuallyHidden>
              <Dialog.Description />
            </VisuallyHidden>
            <IcCloseLine onClick={onClose} />
          </StyledHeader>
          <StyledDescription>{templateTitle}</StyledDescription>

          <ButtonContainer>
            <BoxButton onClick={onClose} size="large" variant="filledSecondary">
              취소
            </BoxButton>
            <BoxButton onClick={handleDelete} size="large" variant="filledPrimary">
              삭제하기
            </BoxButton>
          </ButtonContainer>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
