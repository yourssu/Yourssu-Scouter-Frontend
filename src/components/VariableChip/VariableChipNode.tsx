import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

import { VariableChip } from '@/components/VariableChip/VariableChip';
import { useOptionalMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { useMailData } from '@/pages/SendMail/hooks/useMailData';

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

const VariableChipNodeView: React.FC<NodeViewProps> = ({ node }) => {
  const context = useOptionalMailVariables();
  const { getDisplayVariableValue } = useMailData(context?.selectedTemplateId);

  const { key, type, label, perRecipient } = node.attrs as {
    key: string;
    label: string;
    perRecipient: boolean;
    type: string;
  };

  if (!context) {
    return (
      <NodeViewWrapper as="span" className="variable-chip-node" style={{ display: 'inline-block' }}>
        <VariableChip label={label} size="small" type={type as any} />
      </NodeViewWrapper>
    );
  }

  const displayValue = getDisplayVariableValue(key, perRecipient);

  return (
    <NodeViewWrapper
      as="span"
      className="variable-chip-node"
      style={{
        display: 'inline-block',
      }}
    >
      {displayValue ? (
        <span className="text-text-basicPrimary bg-transparent px-0">{displayValue}</span>
      ) : (
        <VariableChip label={label} size="small" type={type as any} />
      )}
    </NodeViewWrapper>
  );
};
