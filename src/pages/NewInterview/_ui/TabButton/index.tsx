import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/dom';

export interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  size: 'lg' | 'md';
}

const container = tv({
  base: 'ease-ease flex w-full cursor-pointer items-center justify-start gap-2 transition-colors duration-200',
  variants: {
    active: {
      true: 'bg-[rgba(2,32,71,0.05)] font-semibold text-[#333d4b]',
      false: 'font-medium text-[#4e5968] hover:bg-[rgba(2,32,71,0.05)]',
    },
    size: {
      md: 'h-8 rounded-md px-3 text-sm',
      lg: 'h-9.5 rounded-lg px-3.5 text-[15px]',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ active, size, left, right, children, className, ...props }, ref) => {
    return (
      <button
        className={cn(container({ active, size }), className)}
        ref={ref}
        type="button"
        {...props}
      >
        {left && <div className="flex shrink-0 items-center justify-center">{left}</div>}
        <span className="flex flex-1 items-center truncate text-left">{children}</span>
        {right && <div className="flex shrink-0 items-center justify-center">{right}</div>}
      </button>
    );
  },
);

TabButton.displayName = 'TabButton';
