// VariableChipNode.ts
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { VariableChipNodeView } from './VariableChipNodeView';

export interface VariableChipOptions {
  htmlAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    variableChip: {
      insertVariableChip: (options: { label: string; type: string }) => ReturnType;
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
