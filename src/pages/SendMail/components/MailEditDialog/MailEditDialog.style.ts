import { Dialog } from 'radix-ui';
import styled from 'styled-components';

export const StyledOverlay = styled(Dialog.Overlay)`
  background: rgba(37, 38, 44, 0.65);
  position: fixed;
  inset: 0;
`;

export const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 1200px);
  height: 90vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border-radius: ${({ theme }) => theme.semantic.radius.xl}px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`;

export const StyledTitleInput = styled.input`
  flex: 1;
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.T3_Sb_20};

  border: none;
  outline: none;
  background: none;

  &::placeholder {
    color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
