import { EditorContent } from '@tiptap/react';
import { styled } from 'styled-components';

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
