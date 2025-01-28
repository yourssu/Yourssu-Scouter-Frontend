import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px 48px 40px;
`;

export const StyledSearchBarContainer = styled.div`
    width: 432px;
    margin: 16px 0;
`;

export const StyledTable = styled.table`
    border-collapse: collapse;
    border-radius: ${({theme}) => theme.semantic.radius.l}px;
    border-style: hidden;
    box-shadow: 0 0 0 1px ${({theme}) => theme.semantic.color.lineBasicMedium};
    table-layout: fixed;
    
    & td:first-child,
    & th:first-child {
        border-radius: ${({theme}) => theme.semantic.radius.l}px 0 0 0;
    }

    & td:last-child,
    & th:last-child {
        border-radius: 0 ${({theme}) => theme.semantic.radius.l}px 0 0;
    }
`;

export const StyledThead = styled.thead`
    background: ${({theme}) => theme.semantic.color.bgBasicLight};
    height: 50px;
`;

export const StyledBasis = styled.tr`
    border-radius: ${({theme}) => theme.semantic.radius.l}px;
    height: 50px;
`;

export const StyledCell = styled.th`
    padding: 0 50px 0 16px;
    overflow: hidden; // 넘치는 내용 처리
    white-space: nowrap; // 줄바꿈 방지
    text-overflow: ellipsis; // 말줄임표 표시
    ${({theme}) => theme.typo.B1_Rg_16};
`;

export const StyledBodyCell = styled.td`
  max-height: 50px;
  padding: 12px 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({theme}) => theme.typo.B1_Rg_16};
`;