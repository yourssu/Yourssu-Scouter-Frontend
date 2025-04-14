import { DropdownMenu } from 'radix-ui';
import styled from 'styled-components';

export const StyledTrigger = styled(DropdownMenu.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  max-width: 562px;
  width: 100%;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px
      ${({ theme }) => theme.semantic.color.textBrandPrimary};
  }
`;

export const StyledDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
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

export const StyledItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.semantic.radius.s}px;
  user-select: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.semantic.color.buttonTextSecondaryPressed};
  }
`;

export const StyledLabel = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Sb_16};
  flex-grow: 1;
`;

export const StyledItemText = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  ${({ theme }) => theme.typo.B3_Sb_14};

  &:hover {
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  }
`;

export const StyledSelectedLabel = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Sb_16};
  flex-grow: 1;
`;
