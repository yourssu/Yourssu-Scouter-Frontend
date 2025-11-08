import styled from 'styled-components';

export const StyledContainer = styled.header`
  display: flex;
  width: 100%;
  padding: 16px 24px;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
`;

export const StyledNickname = styled.span`
  ${({ theme }) => theme.typo.T3_Sb_20}
`;

export const StyledProfileImage = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.semantic.radius.xl}px;
  background: #d9d9d9;
`;
