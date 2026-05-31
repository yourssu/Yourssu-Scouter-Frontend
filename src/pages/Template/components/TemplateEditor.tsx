import { Extension } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { getChipType } from '@/components/VariableChip/utils';
import { VariableChipNode } from '@/components/VariableChip/VariableChipNode';
import { PlainTextPaste } from '@/extensions/PlainTextPaste';
import {
  MailEditorContent,
  MailEditorContentRef,
} from '@/pages/SendMail/components/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/components/MailHeader/MailHeader';
import { useMailContentContext } from '@/pages/SendMail/context';
import { Variable, VariableType } from '@/types/editor';
import { AttachmentType } from '@/utils/buildMailRequest';
import { transformBodyHtmlToContent, transformContentToBodyHtml } from '@/utils/transformTemplate';

interface TemplateEditorProps {
  onAttachmentsChange?: (attachments: AttachmentType[]) => void;
  onContentChange: (content: string) => void;
  onSubjectChange: (subject: string) => void;
  onVariablesChange: (variables: Variable[]) => void;
  templateAttachments?: AttachmentType[];
  templateContent: string;
  templateSubject: string;
  templateVariables: Variable[];
}

const stripParagraphTags = (html: string) => {
  return html.replace(/<\/p><p>/g, ' ').replace(/<\/?p>/g, '');
};

const StyledSubjectEditor = styled(EditorContent)`
  width: 100%;
  outline: none;

  .tiptap {
    outline: none;
    width: 100%;

    p {
      margin: 0;
    }

    p.is-editor-empty:first-child::before {
      color: ${({ theme }) => theme.semantic.color.textBasicDisabled};
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
`;

export const TemplateEditor = ({
  templateAttachments = [],
  templateContent,
  templateSubject = '',
  templateVariables,
  onAttachmentsChange,
  onContentChange,
  onSubjectChange,
  onVariablesChange,
}: TemplateEditorProps) => {
  const editorRef = useRef<MailEditorContentRef>(null);
  const lastFocusedField = useRef<'content' | 'subject'>('content');
  const { mailContent, actions } = useMailContentContext();
  const initialMount = useRef(true);

  const subjectEditor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      PlainTextPaste,
      VariableChipNode,
      Placeholder.configure({
        placeholder: '메일 제목을 입력하세요',
        emptyEditorClass: 'is-editor-empty',
      }),
      Extension.create({
        name: 'singleLine',
        addKeyboardShortcuts() {
          return {
            Enter: () => true,
            'Shift-Enter': () => true,
          };
        },
      }),
    ],
    content: templateSubject ? transformBodyHtmlToContent(templateSubject, templateVariables) : '',
    editable: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onSubjectChange(stripParagraphTags(transformContentToBodyHtml(editor.getHTML())));
    },
    onFocus: () => {
      lastFocusedField.current = 'subject';
    },
  });

  // 컨텍스트에 초기 첨부파일 상태 세팅
  useEffect(() => {
    if (initialMount.current) {
      actions.updateMailContent({ attachments: templateAttachments });
      initialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 컨텍스트의 첨부파일 상태가 바뀌면 상위로 이벤트 전달
  useEffect(() => {
    if (!initialMount.current && onAttachmentsChange) {
      onAttachmentsChange(mailContent.attachments);
    }
  }, [mailContent.attachments, onAttachmentsChange]);

  // templateSubject가 상위 컴포넌트(예: 초기 데이터 로드)에서 바뀔 때 에디터에 반영
  useEffect(() => {
    if (subjectEditor) {
      const currentHtml = subjectEditor.getHTML();
      const rawHtml = templateSubject
        ? transformBodyHtmlToContent(templateSubject, templateVariables)
        : '';
      const nextHtml = rawHtml ? `<p>${rawHtml}</p>` : '<p></p>';

      if (currentHtml !== nextHtml) {
        subjectEditor.commands.setContent(nextHtml);
      }
    }
  }, [subjectEditor, templateSubject, templateVariables]);

  const insertVariableToSubject = (variable: Variable) => {
    if (subjectEditor) {
      subjectEditor
        .chain()
        .focus()
        .insertContent({
          type: 'variableChip',
          attrs: {
            key: variable.key,
            type: getChipType(variable.type),
            label: variable.displayName,
            perRecipient: variable.perRecipient,
          },
        })
        .insertContent(' ')
        .run();
    }
  };

  const handleVariableClick = (variable: Variable) => {
    if (lastFocusedField.current === 'subject') {
      insertVariableToSubject(variable);
    } else if (editorRef.current) {
      const chipType = getChipType(variable.type);
      editorRef.current.insertVariable(
        variable.key,
        chipType,
        variable.displayName,
        variable.perRecipient,
      );
    }
  };

  const handleVariableAdd = (type: VariableType, displayName: string, perRecipient: boolean) => {
    const newVariable: Variable = {
      key: `var-${crypto.randomUUID()}`,
      type,
      displayName,
      perRecipient,
      items: type === '사람' ? [] : [{ value: '' }],
    };

    onVariablesChange([...templateVariables, newVariable]);

    if (lastFocusedField.current === 'subject') {
      insertVariableToSubject(newVariable);
    } else {
      editorRef.current?.insertVariable(
        newVariable.key,
        getChipType(newVariable.type),
        newVariable.displayName,
        newVariable.perRecipient,
      );
    }
  };

  const handleVariableDelete = (variable: Variable) => {
    onVariablesChange(templateVariables.filter((v) => v.key !== variable.key));

    if (editorRef.current) {
      editorRef.current.deleteVariable(variable.key);
    }

    if (subjectEditor) {
      const transaction = subjectEditor.state.tr;
      const nodesToDelete: { pos: number; size: number }[] = [];

      subjectEditor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'variableChip' && node.attrs.key === variable.key) {
          nodesToDelete.push({ pos, size: node.nodeSize });
        }
      });

      nodesToDelete.reverse().forEach(({ pos, size }) => {
        transaction.delete(pos, pos + size);
      });

      subjectEditor.view.dispatch(transaction);
    }
  };

  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-[690px] w-[1160px] flex-col rounded-xl border">
      <MailHeader
        onVariableAdd={handleVariableAdd}
        onVariableClick={handleVariableClick}
        onVariableDelete={handleVariableDelete}
        type="normal"
        variables={templateVariables}
      />
      <div className="border-line-basicMedium flex min-h-[48px] items-center border-b px-[16px] py-[10px]">
        <StyledSubjectEditor
          className="typo-b1_rg_16 text-text-basicPrimary w-full"
          editor={subjectEditor}
        />
      </div>
      <MailEditorContent
        initialContent={templateContent}
        onContentChange={onContentChange}
        onFocus={() => {
          lastFocusedField.current = 'content';
        }}
        ref={editorRef}
      />
    </div>
  );
};
