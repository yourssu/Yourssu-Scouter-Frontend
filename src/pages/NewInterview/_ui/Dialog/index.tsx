import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AnimatePresence, motion } from 'motion/react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { MdClose } from 'react-icons/md';

import { cn } from '@/utils/dom';

import { type ButtonProps, Button as StyledButton } from '../Button';

type DialogButtonProps = Omit<ButtonProps, 'size'> & { size?: ButtonProps['size'] };

export interface DialogProps {
  closeableWithOutside?: boolean;
  contentProps?: DialogPrimitive.DialogContentProps;
  onClose: () => void;
  open: boolean;
}

const Header = ({
  children,
  className,
  onClickCloseButton,
}: React.PropsWithChildren<{ className?: string; onClickCloseButton?: () => void }>) => {
  return (
    <div className={cn('flex w-full bg-[#ffffff]', className)}>
      <div className="w-full px-6 pt-5">{children}</div>
      {onClickCloseButton && (
        <div className="pt-5 pr-3.5">
          <button
            className="ease-ease inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:bg-[#e5e8eb] focus-visible:bg-[#e5e8eb] active:bg-[#e5e8eb]"
            onClick={onClickCloseButton}
          >
            <MdClose className="size-5 text-[#6b7684]" />
          </button>
        </div>
      )}
    </div>
  );
};

const Title = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="text-xl font-semibold">{children}</div>;
};

const Content = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        'flex max-w-[720px] flex-col overflow-y-auto px-6 pt-5 pb-5 text-[15px] text-[#4e5968]',
        className,
      )}
    >
      {children}
    </div>
  );
};

const ButtonGroup = ({ className, children }: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        'grid w-full auto-cols-[minmax(min-content,96px)] grid-flow-col justify-end gap-2 bg-[#ffffff] px-6 pb-5',
        className,
      )}
    >
      {children}
    </div>
  );
};

const Button = ({ size = 'lg', children, ...props }: DialogButtonProps) => {
  return (
    <StyledButton size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export const Dialog = ({
  onClose,
  open,
  closeableWithOutside,
  children,
  contentProps = {},
}: React.PropsWithChildren<DialogProps>) => {
  const onCloseWithOutside = (e: Event) => {
    if (!closeableWithOutside) {
      e.preventDefault();
    }
  };

  return (
    <DialogPrimitive.Root onOpenChange={(v) => !v && onClose()} open={open}>
      <AnimatePresence>
        {open && (
          // forceMount: 이게 있어야 exit 애니메이션이 제대로 작동해요.
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay className="fixed inset-0" />

            <DialogPrimitive.Content
              {...contentProps}
              className={cn(
                'fixed top-1/2 left-1/2 max-h-[calc(100vh-40px)] -translate-1/2',
                contentProps.className,
              )}
              onEscapeKeyDown={onCloseWithOutside}
              onInteractOutside={onCloseWithOutside}
              onPointerDownOutside={onCloseWithOutside}
            >
              <motion.div
                animate="animate"
                className="h-full overflow-hidden rounded-2xl bg-[#ffffff] shadow-[0_0_0_1px_rgba(2,32,71,0.05),0_10px_40px_0_rgba(2,32,71,0.05),0_20px_50px_0_rgba(0,23,51,0.02),2px_70px_80px_0_rgba(0,23,51,0.02)] will-change-transform"
                exit="initial"
                initial="initial"
                transition={{
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1], // timing-function: ease
                }}
                variants={{
                  initial: { opacity: 0, scale: 0.7 },
                  animate: { opacity: 1, scale: 1 },
                }}
              >
                <VisuallyHidden>
                  <DialogPrimitive.Title />
                  <DialogPrimitive.Description />
                  <DialogPrimitive.Close />
                </VisuallyHidden>
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};

Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Title = Title;
Dialog.ButtonGroup = ButtonGroup;
Dialog.Button = Button;
