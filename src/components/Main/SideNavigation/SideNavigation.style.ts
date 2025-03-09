import styled from 'styled-components';
import { NavLink } from 'react-router';

export const StyledContainer = styled.nav`
  display: flex;
  width: 266px;
  min-height: 100%;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #f1f1f4;
  background: #f7f8f8;
`;

export const StyledLogo = styled.div`
  display: flex;
  height: 80px;
  padding: 0 24px;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  align-self: stretch;
`;

export const StyledLogoText = styled.span`
  ${({ theme }) => theme.typo.T4_Sb_18};
`;

export const StyledLinks = styled.div`
  display: flex;
  padding: 4px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;

export const StyledSectionTitle = styled.span`
  display: flex;
  padding-left: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.typo.B2_Sb_15};
`;

export const StyledNavigationLink = styled(NavLink)`
  display: inline-flex;
  height: 40px;
  padding: 0 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.semantic.radius.xs}px;
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  ${({ theme }) => theme.typo.B1_Sb_16};

  &:hover,
  &[aria-current='page'] {
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
    background-color: #e7e8eb;
  }
`;
