import React, { useRef, useState } from 'react';
import { DialogOption } from '../StateButton/StateButton';

import { Dialog } from './Dialog';

interface GenericDialogProps {
  options: DialogOption[];
  onSelect: (value: string) => void;
  width?: number;
  position?: 'top' | 'bottom';
  children: (props: {
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
  }) => React.ReactElement;
}

export const GenericDialog = ({
  options,
  onSelect,
  children,
  width = 128,
  position = 'bottom',
}: GenericDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ width: '100%' }} ref={anchorRef}>
      {children({
        onClick: () => setIsOpen((prev) => !prev),
        onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
      })}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        onSelect={onSelect}
        position={position}
        width={width}
        anchorEl={anchorRef.current}
      />
    </div>
  );
};
