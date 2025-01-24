import styled from "styled-components";

export const StyledContainer = styled.nav`
    display: flex;
    width: 266px;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    border-right: 1px solid #F1F1F4;
    background: #F7F8F8;
`;

export const StyledLogo = styled.div`
    display: flex;
    height: 80px;
    padding: 0 24px;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;
`

export const StyledLogoText = styled.span`
    ${({ theme }) => theme.typo.T4_Sb_18};
`;