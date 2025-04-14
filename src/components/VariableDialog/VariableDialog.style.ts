import { DropdownMenu } from 'radix-ui';
import styled from 'styled-components';

export const StyledTrigger = styled(DropdownMenu.Trigger)`
  display: inline-flex;
`;

export const StyledContent = styled(DropdownMenu.Content)`
  min-width: 249px;
  background-color: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  box-shadow: 0px 0px 10px 0px rgba(110, 118, 135, 0.25);
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  padding: 10px;
`;

export const StyledTitle = styled.div`
  min-width: 229px;
  min-height: 36px;
  padding: 6px;
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Sb_16};
`;

export const StyledItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  min-width: 229px;
  min-height: 36px;
  padding: 0px 10px;
  border-radius: ${({ theme }) => theme.semantic.radius.s}px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.semantic.color.buttonTextSecondaryPressed};
  }
`;

export const StyledItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  margin-right: 6px;
`;

export const StyledItemText = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  ${({ theme }) => theme.typo.B3_Sb_14};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 4px 0px 12px 0px;
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Sb_16};
`;

export const StyledBackButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
`;

export const StyledVariableType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
  ${({ theme }) => theme.typo.B3_Rg_14};
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  span {
    ${({ theme }) => theme.typo.B3_Sb_14};
  }
`;

export const StyledSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
`;

export const StyledSwitchLabel = styled.span`
  ${({ theme }) => theme.typo.B3_Rg_14};
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
`;
