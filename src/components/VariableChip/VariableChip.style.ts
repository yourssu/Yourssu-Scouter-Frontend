import styled, { css } from 'styled-components';

const sizeStyles = {
  large: css`
    height: 32px;
    padding: 0 10px;
    ${({ theme }) => theme.typo.B3_Sb_14}
  `,
  small: css`
    height: 24px;
    padding: 0 8px;
    ${({ theme }) => theme.typo.C1_Sb_13}
  `,
};

export const ChipWrapper = styled.div<{ size: 'large' | 'small' }>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background-color: ${({ theme }) => theme.semantic.color.chipUnselected};
  border-radius: ${({ theme }) => theme.semantic.radius.xs}px;
  ${({ size }) => sizeStyles[size]}
`;

export const IconWrapper = styled.span`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.semantic.color.iconBrandSecondary};
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
`;
