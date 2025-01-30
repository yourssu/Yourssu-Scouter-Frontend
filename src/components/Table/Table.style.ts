import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px 48px 40px;
`;

export const StyledTableContainerContainer = styled.div`
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
        transition: background-color 0.3s ease;
    }
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        height: 8px;
        background-color: transparent;
        border-radius: 999px;
    }

    &:hover::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background-color: #B5B9C4;
        transition: background-color 0.3s ease;
    }
`;

export const StyledTableContainer = styled.div`
    width: fit-content;
    overflow: hidden;
    border-radius: ${({theme}) => theme.semantic.radius.l}px;
    border: 1px solid ${({theme}) => theme.semantic.color.lineBasicMedium};
`;

export const StyledSearchBarContainer = styled.div`
    width: 432px;
    margin: 16px 0;
`;

export const StyledTable = styled.table`
    border-collapse: collapse;
    border-radius: ${({theme}) => theme.semantic.radius.l}px;
    border-style: hidden;
    table-layout: fixed;
    
    
    & th:first-child {
        padding-left: 40px;
        border-radius: ${({theme}) => theme.semantic.radius.l}px 0 0 0;
    }

    & td:first-child {
        padding-left: 24px;
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

export const StyledList = styled.tr`
    height: 64px;
    border-bottom: 1px solid ${({theme}) => theme.semantic.color.lineBasicLight};
    background: ${({theme}) => theme.semantic.color.bgBasicDefault};
`;

export const StyledCell = styled.th`
    ${({theme}) => theme.typo.B1_Rg_16};
    text-align: left;
    padding-left: 16px;
`;

export const StyledEditIcon = styled.span`
    display: flex;
    width: 24px;
    height: 24px;
    padding: 2px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: ${({theme}) => theme.semantic.color.iconBrandPrimary};
    margin-left: 24px;
    
    &:hover {
        border-radius: 4px;
        background: ${({theme}) => theme.primitive.color.effect050};
        cursor: pointer;
    }
`;

export const StyledBodyCell = styled.td`
    white-space: nowrap;
`;

export const StyledBodyCellData = styled.span<{$special: boolean}>`
    ${({theme}) => theme.typo.B1_Rg_16};
    
    ${({$special, theme}) => !$special && `
        &:hover {
            background: ${theme.semantic.color.bgBasicLight};
        }
    `}
    
    &:hover ${StyledEditIcon} {
        visibility: visible;
    }
    
    & ${StyledEditIcon} {
        visibility: hidden;
    }
    
    display: flex;
    height: 64px;
    padding: 24px 16px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
`;