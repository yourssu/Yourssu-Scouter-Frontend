import styled from 'styled-components';

export const StyledEditIcon = styled.span`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.semantic.color.iconBrandPrimary};
  margin-left: 8px;

  &:hover {
    border-radius: 4px;
    background: ${({ theme }) => theme.primitive.color.effect050};
    cursor: pointer;
  }
`;

export const StyledContainer = styled.span<{
  $editable: boolean;
  $bold: boolean;
}>`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ $bold }) => ($bold ? 600 : 400)};
  align-items: center;
  width: 100%;
  padding: 24px 16px;
  height: 64px;

  ${({ $editable, theme }) =>
    $editable &&
    `
        &:hover {
            background: ${theme.semantic.color.bgBasicLight};
        }
    `}
  &:hover ${StyledEditIcon} {
    visibility: visible;
  }

  & ${StyledEditIcon} {
    visibility: hidden;
  }
`;

export const StyledInput = styled.input<{ $bold: boolean }>`
  display: inline-block;
  width: 100%;
  font-size: 16px;
  font-style: normal;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  font-weight: ${({ $bold }) => ($bold ? 600 : 400)};

  border: none;
  background: none;

  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  caret-color: ${({ theme }) => theme.semantic.color.lineStatusPositive};
`;
