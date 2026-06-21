import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/dom';

interface InlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const InlineButton = ({ className, children, ...props }: InlineButtonProps) => {
  const Comp = props.asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'ease-ease inline-block cursor-pointer rounded-md px-1.5 transition-colors duration-200 hover:bg-[rgba(2,32,71,0.05)] focus-visible:bg-[rgba(2,32,71,0.05)]',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
