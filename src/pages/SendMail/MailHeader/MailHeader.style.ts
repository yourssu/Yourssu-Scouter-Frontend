import { styled } from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  min-height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
`;

export const HeaderLabel = styled.span`
  padding: 8px 12px;
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  ${({ theme }) => theme.typo.B1_Sb_16};
`;

// 변수 chip 추후에 만들어서 변경 예정
export const VariableChip = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  margin-right: 8px;
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B3_Sb_14};
`;

export const VariableAddButton = styled.button``;

export const TabsContainer = styled.div`
  margin-left: 10px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
`;
