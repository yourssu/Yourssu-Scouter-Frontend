import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

import { VariableChip } from '@/components/VariableChip/VariableChip';

export const VariableChipNodeView: React.FC<NodeViewProps> = ({ node }) => {
  const { type, label } = node.attrs as { label: string; type: string };

  return (
    <NodeViewWrapper
      as="span"
      className="variable-chip-node"
      style={{
        display: 'inline-block',
      }}
    >
      <VariableChip label={label} size="small" type={type as any} />
    </NodeViewWrapper>
  );
};
