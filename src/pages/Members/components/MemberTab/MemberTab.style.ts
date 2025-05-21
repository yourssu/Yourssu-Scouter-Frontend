import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px 48px 40px;
`;

export const StyledTopLeftContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
`;

export const StyledLastUpdate = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledLastUpdateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
  text-align: center;

  ${({ theme }) => theme.typo.B2_Rg_15}
`;
