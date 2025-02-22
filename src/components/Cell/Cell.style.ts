import styled from "styled-components";

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

export const StyledContainer = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:hover ${StyledEditIcon} {
        visibility: visible;
    }

    & ${StyledEditIcon} {
        visibility: hidden;
    }
`;