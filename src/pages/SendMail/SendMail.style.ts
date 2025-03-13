import { EditorContent } from "@tiptap/react";
import { styled } from "styled-components";

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
