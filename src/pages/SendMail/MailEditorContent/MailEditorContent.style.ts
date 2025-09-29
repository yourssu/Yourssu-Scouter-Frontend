import { EditorContent } from '@tiptap/react';
import { styled } from 'styled-components';

export const EditorWrapper = styled.div`
  padding: 16px;
  overflow-y: auto;
`;

export const StyledEditorContent = styled(EditorContent)`
  height: 100%;
  outline: none;
  min-height: 280px;
  max-height: 572px;
  position: relative;

  .tiptap {
    font-synthesis: weight style small-caps;

    a {
      color: #525b64ff;
      text-decoration: underline;
    }
    p + p {
      margin-top: 4px;
    }
    ul,
    ol {
      padding-left: 24px;
      margin: 0;
    }
  }
`;
