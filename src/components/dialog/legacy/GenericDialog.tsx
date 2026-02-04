import { Popover } from 'radix-ui';
import { ReactNode } from 'react';

import { DialogContainer, StyledTextButton } from '@/components/dialog/legacy/Dialog.style';

import { DialogOption } from '../../StateButton/StateButton';

interface GenericDialogProps {
  children: ReactNode;
  contentProps?: Popover.PopoverContentProps;
  onSelect: (value: string) => void;
  options: DialogOption[];
  width?: number;
}

export const GenericDialog = ({
  options,
  onSelect,
  children,
  width = 128,
  contentProps,
}: GenericDialogProps) => {
  return (
    <Popover.Root>
      <Popover.Anchor asChild>{children}</Popover.Anchor>
      <Popover.Portal>
        <Popover.Content asChild sideOffset={6} {...contentProps}>
          <DialogContainer $width={width}>
            {options.map((option) => (
              <Popover.Close asChild key={option.label}>
                <StyledTextButton
                  key={option.label}
                  onClick={() => {
                    onSelect(option.label);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  size="medium"
                  variant="textSecondary"
                >
                  {option.label}
                </StyledTextButton>
              </Popover.Close>
            ))}
          </DialogContainer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
