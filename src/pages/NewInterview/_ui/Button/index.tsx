import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { usePrevious } from 'react-simplikit';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  left?: React.ReactNode;
  loading?: boolean;
  right?: React.ReactNode;
  size: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl' | 'xxs';
  variant?: 'primary' | 'secondary' | 'subPrimary' | 'transparent';
}

const button = tv({
  base: 'group flex cursor-pointer items-center justify-center gap-1 transition-[background-color_0.2s_ease,color_0.2s_ease] disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        'bg-[#5b4dff] text-[#ffffff] hover:bg-[#4a3fe0] disabled:bg-[rgb(91,77,255,0.45)] disabled:text-[rgba(255,255,255,0.45)]',
      secondary:
        'bg-[rgba(2,32,71,0.05)] text-[rgba(0,12,30,0.8)] hover:bg-[rgba(0,27,55,0.1)] disabled:bg-[rgba(2,32,71,0.05)] disabled:text-[rgba(0,29,58,0.18)]',
      subPrimary:
        'bg-[rgb(91,77,255,0.15)] text-[#4a3fe0] hover:bg-[rgb(91,77,255,0.35)] disabled:bg-[rgb(91,77,255,0.15)] disabled:text-[rgb(91,77,255,0.35)]',
      transparent:
        'bg-transparent text-[rgba(0,12,30,0.8)] hover:bg-[rgba(2,32,71,0.05)] disabled:bg-transparent disabled:text-[#8b95a1]',
    },
    size: {
      xxs: 'h-5 rounded-md px-1.5 text-[11px] font-medium',
      xs: 'h-6 rounded-md px-2 text-xs font-medium',
      sm: 'h-7 rounded-lg px-2.5 text-[13px] font-medium',
      md: 'h-8 rounded-lg px-3 text-sm font-medium',
      lg: 'h-9.5 rounded-[10px] px-4 text-[15px] font-medium',
      xl: 'h-12 rounded-[14px] px-5 text-[17px] font-medium',
      xxl: 'h-17 rounded-2xl px-7 text-[17px] font-medium',
    },
  },
});

const icon = tv({
  base: 'transition-[opacity_0.2s_ease] group-disabled:opacity-[0.45]',
});

const useLoadingButtonSize = ({ loading }: { loading: boolean }) => {
  const savedSizeRef = useRef({ width: 0, height: 0 });
  const prevLoading = usePrevious(loading);
  const [minSize, setMinSize] = useState<{ height?: number; width?: number }>({});

  const ref = (node: HTMLButtonElement | null) => {
    if (!node || loading) {
      return;
    }
    savedSizeRef.current = {
      width: node.offsetWidth,
      height: node.offsetHeight,
    };
  };

  useLayoutEffect(() => {
    if (loading && !prevLoading && savedSizeRef.current.width > 0) {
      setMinSize(savedSizeRef.current);
    } else if (!loading && prevLoading) {
      setMinSize({});
    }
  }, [loading, prevLoading]);

  return {
    ref,
    minSize,
  };
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size, left, right, children, className, loading = false, ...props },
    outerRef,
  ) => {
    const buttonStyle = button({ variant, size });
    const { ref: buttonRef, minSize } = useLoadingButtonSize({ loading });

    const setOuterRef = (node: HTMLButtonElement | null) => {
      if (!outerRef) {
        return;
      }
      if (typeof outerRef === 'function') {
        outerRef(node);
      } else {
        outerRef.current = node;
      }
    };

    return (
      <button
        className={cn(buttonStyle, className)}
        disabled={loading || props.disabled}
        ref={(node) => {
          buttonRef(node);
          setOuterRef(node);
        }}
        style={{ minWidth: minSize.width, minHeight: minSize.height }}
        {...props}
      >
        {loading ? (
          <span aria-label="loading" className="inline-flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                className="size-1.5 animate-pulse rounded-full bg-current"
                key={i}
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </span>
        ) : (
          <>
            {left && <div className={icon()}>{left}</div>}
            <div className="flex-[1_1_0]">{children}</div>
            {right && <div className={icon()}>{right}</div>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
