import styled from "styled-components";

export const DateFieldContainer = styled.div`
    width: 366px;
    height: 48px;
    background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
    border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
    border-radius: ${({ theme }) => theme.semantic.radius.m}px;
    padding: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
    overflow-y: auto;
    gap: 20px;
    position: relative;

    p {
        color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
        ${({ theme }) => theme.typo.B1_Rg_16}
        position: absolute;
        top: 12px;
        left: 16px;
    }
`;

export const MiniDateFieldContainer = styled(DateFieldContainer)`
    width: 166px;
    height: 56px;
    background: ${({ theme }) => theme.semantic.color.buttonOutlinedEnabled};
    border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
    border-radius: ${({ theme }) => theme.semantic.radius.m}px;
    padding: 0 20px;
    gap: 8px;
    display: flex;
    justify-content: left;
    align-items: center;
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
    ${({ theme }) => theme.typo.B1_Rg_16}
    span {
        
    }
`;