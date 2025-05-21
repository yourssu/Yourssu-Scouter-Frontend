import { ReactNode } from 'react';
import { DialogOption } from '../StateButton/StateButton';

import { Dialog } from './Dialog';
import { Popover } from 'radix-ui';

interface GenericDialogProps {
  options: DialogOption[];
  onSelect: (value: string) => void;
  width?: number;
  position?: 'top' | 'bottom';
  children: ReactNode;
}

export const GenericDialog = ({
  options,
  onSelect,
  children,
  width = 128,
}: GenericDialogProps) => {
  return (
    <Popover.Root>
      <Popover.Anchor asChild>{children}</Popover.Anchor>
      <Dialog options={options} onSelect={onSelect} width={width} />
    </Popover.Root>
  );
};
