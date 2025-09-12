import { Popover } from 'radix-ui';
import { ReactNode } from 'react';

import { DialogContainer, StyledTextButton } from './Dialog.style';

interface DialogOption {
  icon?: ReactNode;
  label: string;
}

interface DialogProps {
  onSelect: (value: string) => void;
  options: DialogOption[];
  width: number;
}

export const Dialog = ({ options, onSelect, width }: DialogProps) => {
  return (
    <Popover.Portal>
      <Popover.Content asChild sideOffset={6}>
        <DialogContainer $width={width}>
          {options.map((option) => (
            <Popover.Close asChild key={option.label}>
              <StyledTextButton
                key={option.label}
                leftIcon={option.icon}
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
  );
};
