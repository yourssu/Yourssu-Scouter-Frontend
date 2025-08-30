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
import { forwardRef, useImperativeHandle } from 'react';

import { MailToolbar } from '../MailToolbar/MailToolbar';
import { EditorWrapper, StyledEditorContent } from './MailEditorContent.style';
// import { VariableChipNode } from '@/components/VariableChip/VariableChipNode';

interface MailEditorContentProps {
  initialContent?: string;
  onContentChange?: (html: string) => void;
  recipientName?: string;
}

export interface MailEditorContentRef {
  insertVariable: (type: string, label: string) => void;
}

export const MailEditorContent = forwardRef<MailEditorContentRef, MailEditorContentProps>(
  ({ recipientName, initialContent, onContentChange }, ref) => {
    const defaultContent = recipientName
      ? `<p>${recipientName}님에게 보낼 내용</p>`
      : '<p>내용을 입력하세요</p>';

    const editor = useEditor({
      extensions: [
        StarterKit,
        // VariableChipNode,
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

    useImperativeHandle(
      ref,
      () => ({
        insertVariable: (type: string, label: string) => {
          if (editor) {
            // ReactNodeViewRenderer로 실제 VariableChip 컴포넌트 삽입
            // editor.chain().focus().insertVariableChip({ type, label }).run();

            console.log('Variable inserted:', { type, label });
            console.log('Current editor content:', editor.getHTML());
          }
        },
      }),
      [editor],
    );

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
  },
);

MailEditorContent.displayName = 'MailEditorContent';
