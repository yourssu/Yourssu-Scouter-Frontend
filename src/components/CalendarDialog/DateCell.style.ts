import styled from 'styled-components';

export const StyledDateCell = styled.button<{
  $isSelected: boolean;
  $isToday: boolean;
}>`
  outline: none;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 10px;
  cursor: default;
  user-select: none;
  ${({ theme }) => theme.typo.B2_Rg_15}
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  background: none;

  &:hover {
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
    background: ${({ theme }) => theme.semantic.color.bgBrandSecondary};
    border-radius: 50%;
  }

  &:disabled {
    color: ${({ theme }) => theme.semantic.color.textBasicDisabled};
    background: none;
  }

  ${({ $isToday, theme }) =>
    $isToday &&
    `
    color: ${theme.semantic.color.textBasicPrimary};
    background: ${theme.semantic.color.bgBasicStrong};
    border-radius: 50%;
  `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
    color: ${theme.semantic.color.textBasicWhite};
    background: ${theme.semantic.color.bgBrandPrimary};
    border-radius: 50%;

    &:hover {
      color: ${theme.semantic.color.textBasicWhite};
      background: ${theme.semantic.color.bgBrandPrimary};
    }
  `}
`;
