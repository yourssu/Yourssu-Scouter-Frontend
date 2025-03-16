import { EditorContent } from '@tiptap/react';
import { styled } from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border-radius: ${({ theme }) => theme.semantic.radius.xl}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  width: 100%;
  max-width: 1100px;
  max-height: 690px;
  margin: 0 auto;
`;

export const EditorWrapper = styled.div`
  padding: 16px;
`;

export const StyledEditorContent = styled(EditorContent)`
  height: 100%;
  outline: none;
  min-height: 280px;

  .tiptap {
    font-synthesis: weight style small-caps;

    a {
      color: #0066cc;
      text-decoration: underline;
    }
    ul,
    ol {
      padding-left: 24px;
      margin: 0;
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  min-height: 48px;
  border-bottom: 1px solid
    ${({ theme }) => theme.semantic.color.lineBasicMedium};
`;

export const HeaderLabel = styled.span`
  padding: 8px 12px;
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  ${({ theme }) => theme.typo.B1_Sb_16};
`;

// 변수 chip 추후에 만들어서 변경 예정
export const VariableChip = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  margin-right: 8px;
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B3_Sb_14};
`;

export const VariableAddButton = styled.button``;

export const TabsContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.semantic.color.lineBasicMedium};
`;
