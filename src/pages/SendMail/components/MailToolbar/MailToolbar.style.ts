import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.semantic.color.bgBasicStrong};
  border-radius: 0 0 ${({ theme }) => theme.semantic.radius.xl}px
    ${({ theme }) => theme.semantic.radius.xl}px;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  min-height: 44px;
  overflow-x: auto;
  max-width: 100%;
`;

export const AttachmentList = styled.div<{ $readOnly?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 16px;
  padding-top: ${({ $readOnly }) => ($readOnly ? '8px' : '0')};
  border-top: 1px solid ${({ theme }) => theme.primitive.color.gray100};
`;

export const AttachmentChip = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.primitive.color.gray200};
  border-radius: 1000px;
  padding: 4px 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.primitive.color.gray700};

  span {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.primitive.color.gray500};
    padding: 0;

    &:hover {
      color: ${({ theme }) => theme.primitive.color.gray700};
    }
  }
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
