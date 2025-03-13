import styled from 'styled-components';
import { DropdownMenu, Popover } from 'radix-ui';

export const StyledContent = styled(Popover.Content)`
  display: flex;
  width: 403px;
  min-width: 386px;
  max-width: 1200px;
  padding: 20px;
  flex-direction: column;

  border-radius: ${({ theme }) => theme.semantic.radius.xl}px;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  box-shadow: 0 0 10px 0 rgba(110, 118, 135, 0.25);
`;

export const StyledTopContainer = styled.div`
  display: flex;
  padding: 0 4px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledTitle = styled.h3`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};

  /* Mobile/Headline/H3_Sb_24 */
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px; /* 141.667% */
  letter-spacing: -0.48px;
`;

export const StyledSupportingText = styled.p`
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  ${({ theme }) => theme.typo.B1_Rg_16}
`;

export const StyledIconButton = styled.span`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.semantic.color.iconBasicTertiary};

  &:hover {
    border-radius: 4px;
    background: ${({ theme }) => theme.primitive.color.effect050};
    cursor: pointer;
  }
`;

export const StyledBottomContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row-reverse;
`;

export const StyledBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const StyledFieldList = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const StyledFieldContainer = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  align-items: center;
`;

export const StyledOptionContent = styled(DropdownMenu.Content)`
  display: flex;
  width: 128px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;

  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  box-shadow: 0 0 10px 0 rgba(110, 118, 135, 0.25);
`;
