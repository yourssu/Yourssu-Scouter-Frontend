import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { MailToolbar } from './MailToolbar/MailToolbar';
import { EditorContainer, EditorWrapper, StyledEditorContent } from './SendMail.style';

export const SendMail = () => {
    
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Underline,
      FontFamily,
      FontSize,
      Image,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https', 'mailto'],
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content: '<p>html형식으로 아마더</p>',
  });

  if (!editor) {
    return <div>에디터 불러오는 중</div>;
  }

  return (
      <EditorContainer className="editor-reset">
        <EditorWrapper>
          <StyledEditorContent editor={editor} />
        </EditorWrapper>
        <MailToolbar editor={editor} />
      </EditorContainer>
  );
};