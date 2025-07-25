import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const StyledTitle = styled.h1`
  ${({ theme }) => theme.typo.H3_Sb_32};
  margin: 40px 0 24px 40px;
`;

export const StyledTabsListContainer = styled.div`
  display: flex;
  padding-left: 24px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
`;

export const StyledSearchbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 38px 24px 40px;
`;

export const StyledTemplateList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 40px;
  gap: 12px;
`;
