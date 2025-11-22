import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { AnimatePresence, motion } from 'motion/react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '@/utils/dom';

interface DialogProps {
  closeableWithOutside?: boolean;
  contentProps?: DialogPrimitive.DialogContentProps;
  onClose: () => void;
  open: boolean;
}

const Header = ({
  children,
  onClickCloseButton,
}: React.PropsWithChildren<{ onClickCloseButton?: () => void }>) => {
  return (
    <div className="flex w-full">
      <div className="w-full px-5 pt-5">{children}</div>
      {onClickCloseButton && (
        <div className="pt-5 pr-3">
          <button
            className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center"
            onClick={onClickCloseButton}
          >
            <IcCloseLine className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

const Title = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="typo-t3_sb_20">{children}</div>;
};

const Content = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn('typo-b1_rg_16 text-text-basicSecondary flex flex-col p-5', className)}>
      {children}
    </div>
  );
};

const ButtonGroup = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full justify-end gap-2 px-5 pb-3">{children}</div>;
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
            <DialogPrimitive.Overlay className="absolute inset-0 z-50">
              <motion.div
                animate="animate"
                className="size-full bg-[#25262CA6]"
                exit="initial"
                initial="initial"
                transition={{
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1], // timing-function: ease
                }}
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content
              {...contentProps}
              className="absolute top-1/2 left-1/2 z-50 min-w-[386px] -translate-1/2"
              onInteractOutside={onCloseWithOutside}
              onPointerDownOutside={onCloseWithOutside}
            >
              <motion.div
                animate="animate"
                className="bg-bg-basicDefault rounded-2xl will-change-transform"
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
Dialog.Button = BoxButton;
