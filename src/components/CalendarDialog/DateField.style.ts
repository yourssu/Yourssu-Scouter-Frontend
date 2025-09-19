import { DropdownMenu } from 'radix-ui';
import styled from 'styled-components';

export const DateFieldContainer = styled.div`
  width: 366px;
  height: 48px;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
  overflow-y: auto;
  gap: 20px;
  position: relative;

  p {
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
    ${({ theme }) => theme.typo.B1_Rg_16}
    position: absolute;
    top: 12px;
    left: 16px;
  }
`;

export const MiniDateFieldContainer = styled(DateFieldContainer)<{
  $isError?: boolean;
}>`
  width: 166px;
  height: 56px;
  background: ${({ $isError, theme }) =>
    $isError ? theme.semantic.color.snackbarError : theme.semantic.color.buttonOutlinedEnabled};
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  border-color: ${({ $isError, theme }) =>
    $isError ? theme.semantic.color.lineStatusNegative : theme.semantic.color.lineBasicMedium};
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  padding: 0 20px;
  gap: 8px;
  display: flex;
  justify-content: left;
  align-items: center;
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Rg_16}

  input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
    ${({ theme }) => theme.typo.B1_Rg_16}
    outline: none;
  }
`;

export const StyledContent = styled(DropdownMenu.Content)`
  width: var(--radix-dropdown-menu-trigger-width);
  background-color: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  padding: 8px;
  box-shadow: 0px 0px 10px 0px rgba(110, 118, 135, 0.25);
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  max-height: 300px;
  overflow-y: auto;
`;

export const StyledItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`;

export const StyledItemText = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  ${({ theme }) => theme.typo.B3_Sb_14};
`;

export const StyledItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.semantic.radius.s}px;
  user-select: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.semantic.color.buttonTextSecondaryPressed};
    ${StyledItemText} {
      color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
    }
  }
`;

export const StyledSelectedLabel = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Sb_16};
  flex-grow: 1;
`;
