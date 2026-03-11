import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

import { VariableChip } from '@/components/VariableChip/VariableChip';
import { useOptionalMailVariables } from '@/pages/SendMail/context';
import { useVariableValue } from '@/pages/SendMail/hooks/useVariableValue';

export interface VariableChipOptions {
  htmlAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    variableChip: {
      insertVariableChip: (options: {
        label: string;
        perRecipient: boolean;
        type: string;
      }) => ReturnType;
    };
  }
}

export const VariableChipNode = Node.create<VariableChipOptions>({
  name: 'variableChip',
  group: 'inline',
  inline: true,
  selectable: true,
  atom: true,

  addOptions() {
    return {
      htmlAttributes: {},
    };
  },

  addAttributes() {
    return {
      key: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-key'),
        renderHTML: (attributes) => {
          if (!attributes.key) {
            return {};
          }
          return {
            'data-key': attributes.key,
          };
        },
      },
      type: {
        default: 'text',
        parseHTML: (element) => element.getAttribute('data-type'),
        renderHTML: (attributes) => {
          if (!attributes.type) {
            return {};
          }
          return {
            'data-type': attributes.type,
          };
        },
      },
      label: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-label'),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }
          return {
            'data-label': attributes.label,
          };
        },
      },
      perRecipient: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-per-recipient') === 'true',
        renderHTML: (attributes) => {
          return {
            'data-per-recipient': attributes.perRecipient,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-variable-chip]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.htmlAttributes, HTMLAttributes, {
        'data-variable-chip': '',
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableChipNodeView) as any;
  },

  addCommands() {
    return {
      insertVariableChip:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

// 실제 변수 값을 보여주는 컴포넌트 (메일 발송 페이지에서만 렌더링)
const VariableValueContent: React.FC<NodeViewProps> = ({ node }) => {
  const { getVariableValue } = useVariableValue();

  const { key, type, label, perRecipient } = node.attrs as {
    key: string;
    label: string;
    perRecipient: boolean;
    type: string;
  };

  const displayValue = getVariableValue(key, perRecipient, label);

  let linkText = displayValue || '';
  let linkUrl = displayValue || '';

  if (displayValue && type === 'link') {
    try {
      const parsed = JSON.parse(displayValue);
      if (parsed && typeof parsed === 'object') {
        linkText = parsed.text || parsed.url || displayValue;
        linkUrl = parsed.url || displayValue;
      }
    } catch {
      // Fallback
    }
  }

  return (
    <NodeViewWrapper as="span" className="variable-chip-node" style={{ display: 'inline-block' }}>
      {displayValue ? (
        type === 'link' ? (
          <a
            contentEditable={false}
            href={linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`}
            rel="noreferrer"
            style={{ color: '#1155cc' }}
            target="_blank"
          >
            {linkText}
          </a>
        ) : (
          <span className="text-text-basicPrimary bg-transparent px-0">{displayValue}</span>
        )
      ) : (
        <VariableChip label={label} size="small" type={type as any} />
      )}
    </NodeViewWrapper>
  );
};

// Tiptap이 직접 사용하는 변수 칩 노드 뷰 컴포넌트
const VariableChipNodeView: React.FC<NodeViewProps> = (props) => {
  const context = useOptionalMailVariables();

  // 템플릿 페이지(Context 없음)일 경우: 하위 컴포넌트를 아예 렌더링하지 않고 즉시 리턴합니다.
  if (!context) {
    const { label, type } = props.node.attrs;
    return (
      <NodeViewWrapper as="span" className="variable-chip-node" style={{ display: 'inline-block' }}>
        <VariableChip label={label} size="small" type={type as any} />
      </NodeViewWrapper>
    );
  }

  // 메일 발송 페이지일 경우에만 하위 컴포넌트를 마운트합니다.
  return <VariableValueContent {...props} />;
};
