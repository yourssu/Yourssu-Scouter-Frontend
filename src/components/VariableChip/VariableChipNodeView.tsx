import { NodeViewWrapper } from '@tiptap/react';
// VariableChipNodeView.tsx
import React from 'react';

import { VariableChip } from '@/components/VariableChip/VariableChip';

interface VariableChipNodeViewProps {
  node: {
    attrs: {
      label: string;
      type: string;
    };
  };
}

export const VariableChipNodeView: React.FC<VariableChipNodeViewProps> = ({
  node,
}) => {
  const { type, label } = node.attrs;

  return (
    <NodeViewWrapper
      as="span"
      className="variable-chip-node"
      style={{ display: 'inline-block' }}
    >
      <VariableChip label={label} size="small" type={type as any} />
    </NodeViewWrapper>
  );
};
