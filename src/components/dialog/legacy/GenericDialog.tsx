import { Popover } from 'radix-ui';
import { ReactNode } from 'react';

import { DialogOption } from '../../StateButton/StateButton';
import { Dialog } from './Dialog';

interface GenericDialogProps {
  children: ReactNode;
  onSelect: (value: string) => void;
  options: DialogOption[];
  position?: 'bottom' | 'top';
  width?: number;
}

export const GenericDialog = ({ options, onSelect, children, width = 128 }: GenericDialogProps) => {
  return (
    <Popover.Root>
      <Popover.Anchor asChild>{children}</Popover.Anchor>
      <Dialog onSelect={onSelect} options={options} width={width} />
    </Popover.Root>
  );
};
