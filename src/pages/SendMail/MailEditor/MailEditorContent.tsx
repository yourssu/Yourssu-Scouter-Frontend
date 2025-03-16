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
import { MailToolbar } from '../MailToolbar/MailToolbar';
import { EditorWrapper, StyledEditorContent } from './MailEditor.style';

interface Recipient {
  recipientName: string;
  active: boolean;
}

export const MailEditorContent = ({ recipientName, active }: Recipient) => {
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
    content: `<p>${recipientName}님에게 보낼 내용</p>`,
    editable: true,
  });

  if (!editor) {
    return <div>에디터 불러오는 중</div>;
  }

  if (!active) {
    return null;
  }

  return (
    <>
      <EditorWrapper>
        <StyledEditorContent editor={editor} />
      </EditorWrapper>
      <MailToolbar editor={editor} />
    </>
  );
};
