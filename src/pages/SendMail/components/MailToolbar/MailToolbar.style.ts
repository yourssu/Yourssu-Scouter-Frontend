import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  min-height: 44px;
  overflow-x: auto;
  max-width: 100%;
  background: ${({ theme }) => theme.semantic.color.bgBasicStrong};
  border-radius: 0 0 ${({ theme }) => theme.semantic.radius.xl}px
    ${({ theme }) => theme.semantic.radius.xl}px;
`;

export const ToolbarGroup = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

export const ToolbarButton = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.semantic.color.bgBasicStrong};
  color: ${({ theme }) => theme.primitive.color.gray500};

  &:hover {
    background: #e0e0e0;
  }

  &.is-active {
    background-color: #e0e0e0;
  }
`;

const SelectBase = styled.select`
  height: 32px;
  padding: 0 8px;
  margin: 0 2px;
  background: ${({ theme }) => theme.semantic.color.bgBasicStrong};
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export const FontSizeSelect = styled(SelectBase)`
  width: 70px;
  color: #334155;
  appearance: none;
`;

export const FontFamilySelect = styled(SelectBase)`
  width: 140px;
  color: #334155;
  appearance: none;
`;

export const ColorButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #e0e0e0;
  cursor: pointer;
  margin: 0 4px;

  &:hover {
    border-color: ${(props) => props.color};
  }

  &.is-active {
    border: 1px solid #1976d2;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #eaecf0;
  margin: 0 8px;
`;
