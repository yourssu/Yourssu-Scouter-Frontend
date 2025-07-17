import styled from "styled-components";

export const DateFieldContainer = styled.div<{
    $width: number;
    $height?: number;
}>`
    width: ${({ $width }) => `${$width}px`};
    height: ${({ $height }) => ($height ? `${$height}px` : 'auto')};
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