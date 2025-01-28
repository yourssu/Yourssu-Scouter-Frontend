import styled from "styled-components";

export const StyledTitle = styled.h1`
    ${({theme}) => theme.typo.H3_Sb_32};
    margin: 40px 0 16px 40px;
`;

export const StyledTabsListContainer = styled.div`
    display: flex;
    padding-left: 24px;
    align-items: center;
    border-bottom: 1px solid ${({theme}) => theme.semantic.color.lineBasicLight};
`;