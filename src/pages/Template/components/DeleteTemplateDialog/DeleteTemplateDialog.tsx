import { Dialog } from 'radix-ui';
import {
  StyledOverlay,
  StyledContent,
  StyledTitle,
  StyledDescription,
  ButtonContainer,
  StyledHeader,
} from './DeleteTemplateDialog.style';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';

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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledHeader>
            <StyledTitle>이 템플릿을 삭제하시겠습니까?</StyledTitle>
            <IcCloseLine onClick={onClose} />
          </StyledHeader>
          <StyledDescription>{templateTitle}</StyledDescription>

          <ButtonContainer>
            <BoxButton size="large" variant="filledSecondary" onClick={onClose}>
              취소
            </BoxButton>
            <BoxButton
              size="large"
              variant="filledPrimary"
              onClick={handleDelete}
            >
              삭제하기
            </BoxButton>
          </ButtonContainer>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
