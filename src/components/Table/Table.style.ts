import styled from 'styled-components';

export const StyledTableContainerContainer = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
`;

export const StyledTableContainer = styled.div`
  overflow: auto;
  width: 100%;
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
  border-style: hidden;
  table-layout: fixed;
  min-width: 100%;

  & th:first-child {
    padding-left: 40px;
    border-radius: ${({ theme }) => theme.semantic.radius.l}px 0 0 0;
  }

  & td:first-child {
    padding-left: 24px;
    border-radius: ${({ theme }) => theme.semantic.radius.l}px 0 0 0;
  }

  & td:last-child,
  & th:last-child {
    border-radius: 0 ${({ theme }) => theme.semantic.radius.l}px 0 0;
  }
`;

export const StyledThead = styled.thead`
  background: ${({ theme }) => theme.semantic.color.bgBasicLight};
  height: 50px;
`;

export const StyledBasis = styled.tr`
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
  height: 50px;
`;

export const StyledList = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
`;

export const StyledCell = styled.th<{ $minWidth: number }>`
  ${({ theme }) => theme.typo.B1_Rg_16};
  text-align: left;
  padding-left: 16px;
  min-width: ${({ $minWidth }) => $minWidth}px;
`;

export const StyledBodyCell = styled.td`
  white-space: nowrap;
`;

export const StyledBorder = styled.div<{ $hasScroll: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $hasScroll }) => ($hasScroll ? 'calc(100% - 8px)' : '100%')};
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  pointer-events: none;
`;

export const StyledBorderBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 8px);
  pointer-events: none;
  overflow: hidden;
`;

export const StyledOuterBorder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
  box-shadow: 0 0 0 8px #fff;
  pointer-events: none;
`;
