import styled from 'styled-components';

export const CardContainer = styled.div`
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  padding: 12px 16px;
  width: 398px;
`;

export const CardTitle = styled.h3`
  ${({ theme }) => theme.typo.B1_Sb_16}
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  margin-bottom: 12px;
`;

export const Count = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.semantic.color.textBrandPrimary};
`;
