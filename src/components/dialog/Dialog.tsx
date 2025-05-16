import { DialogContainer, StyledTextButton } from './Dialog.style';
import { Popover } from 'radix-ui';
import { ReactNode } from 'react';

interface DialogOption {
  label: string;
  icon?: ReactNode;
}

interface DialogProps {
  options: DialogOption[];
  onSelect: (value: string) => void;
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
                size="medium"
                variant="textSecondary"
                leftIcon={option.icon}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => {
                  onSelect(option.label);
                }}
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
