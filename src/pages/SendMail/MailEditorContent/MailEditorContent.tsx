import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { MailToolbar } from '../MailToolbar/MailToolbar';
import { EditorWrapper, StyledEditorContent } from './MailEditorContent.style';

interface MailEditorContentProps {
  initialContent?: string;
  onContentChange?: (html: string) => void;
  recipientName?: string;
}

export const MailEditorContent = ({
  recipientName,
  initialContent,
  onContentChange,
}: MailEditorContentProps) => {
  const defaultContent = recipientName
    ? `<p>${recipientName}님에게 보낼 내용</p>`
    : '<p>내용을 입력하세요</p>';

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
    content: initialContent || defaultContent,
    editable: true,
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
    },
  });

  if (!editor) {
    return <div>에디터 불러오는 중</div>;
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
