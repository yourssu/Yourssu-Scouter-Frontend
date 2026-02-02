import { BoxButton } from '@yourssu/design-system-react';
import { styled } from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  min-height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  flex-shrink: 0;
`;

export const HeaderLabel = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  ${({ theme }) => theme.typo.B1_Sb_16};
`;

export const VariableSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const VariableAddButton = styled(BoxButton)`
  background-color: ${({ theme }) => theme.semantic.color.bgBasicBlack} !important;
  align-self: flex-start;
`;

export const TabsContainer = styled.div`
  margin-left: 10px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  padding-left: 8px;
`;
