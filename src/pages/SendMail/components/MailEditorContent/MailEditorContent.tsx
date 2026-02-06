import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useImperativeHandle } from 'react';

import { VariableChipNode } from '@/components/VariableChip/VariableChipNode';
import { VariableKeyType } from '@/types/editor';

import { MailToolbar } from '../MailToolbar/MailToolbar';
import { EditorWrapper, StyledEditorContent } from './MailEditorContent.style';

interface MailEditorContentProps {
  currentApplicantId?: string;
  initialContent?: string;
  onContentChange?: (html: string) => void;
  recipientName?: string;
}

export interface MailEditorContentRef {
  deleteVariable: (key: VariableKeyType) => void;
  insertVariable: (
    key: VariableKeyType,
    type: string,
    label: string,
    perRecipient: boolean,
  ) => void;
}

export const MailEditorContent = forwardRef<MailEditorContentRef, MailEditorContentProps>(
  ({ recipientName, initialContent, onContentChange }, ref) => {
    const placeholderText = recipientName
      ? `${recipientName}님에게 보낼 내용`
      : '내용을 입력하세요';

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          link: false,
          underline: false,
        }),
        VariableChipNode,
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
        Placeholder.configure({
          placeholder: placeholderText,
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      content: initialContent || '',
      editable: true,
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        if (onContentChange) {
          onContentChange(editor.getHTML());
        }
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        insertVariable: (
          key: VariableKeyType,
          type: string,
          label: string,
          perRecipient: boolean,
        ) => {
          if (editor) {
            editor
              .chain()
              .focus()
              .insertContent({
                type: 'variableChip',
                attrs: { key, type, label, perRecipient },
              })
              .insertContent(' ') // 변수칩 뒤에 공백 추가(가독성 향상 및 커서 줄바꿈 현상 방지)
              .run();
          }
        },
        deleteVariable: (key: VariableKeyType) => {
          if (editor) {
            const transaction = editor.state.tr;
            const nodesToDelete: { pos: number; size: number }[] = []; // 텍스트 내 삭제할 노드 위치와 크기 저장

            // 텍스트 전체 탐색
            editor.state.doc.descendants((node, pos) => {
              if (node.type.name === 'variableChip' && node.attrs.key === key) {
                nodesToDelete.push({ pos, size: node.nodeSize });
              }
            });

            // 역순 삭제
            nodesToDelete.reverse().forEach(({ pos, size }) => {
              transaction.delete(pos, pos + size);
            });
            editor.view.dispatch(transaction);
          }
        },
      }),
      [editor],
    );

    if (!editor) {
      return <div>에디터 불러오는 중</div>;
    }

    return (
      <div className="flex h-full flex-col">
        <EditorWrapper>
          <StyledEditorContent editor={editor} />
        </EditorWrapper>
        <MailToolbar editor={editor} />
      </div>
    );
  },
);

MailEditorContent.displayName = 'MailEditorContent';
