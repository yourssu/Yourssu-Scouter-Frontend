import { Dialog } from 'radix-ui';
import styled from 'styled-components';

export const StyledOverlay = styled(Dialog.Overlay)`
  background: rgba(37, 38, 44, 0.65);
  position: fixed;
  inset: 0;
  /* z-index: 50; */
`;

export const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 386px;
  height: 186px;
  min-width: 386px;
  max-width: 1200px;
  padding: 20px;
  gap: 24px;
  border-radius: ${({ theme }) => theme.semantic.radius.xl}px;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`;

export const StyledTitle = styled(Dialog.Title)`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.T3_Sb_20};
`;

export const StyledDescription = styled(Dialog.Description)`
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  ${({ theme }) => theme.typo.B1_Rg_16}
  margin: 16px 4px 20px 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
