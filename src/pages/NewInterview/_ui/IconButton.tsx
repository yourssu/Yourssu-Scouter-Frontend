import { tv } from 'tailwind-variants';

import { cn } from '@/utils/dom';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl' | 'xxs';
  variant?: 'dimmed' | 'inline';
}

const button = tv({
  base: 'ease-ease flex cursor-pointer items-center justify-center transition-colors duration-200 enabled:hover:bg-[rgba(0,27,55,0.1)] disabled:cursor-not-allowed disabled:text-[rgba(0,25,54,0.31)]',
  variants: {
    size: {
      xxs: 'size-5 rounded-sm', // 20px -> xxs이동
      xs: 'size-6 rounded-sm', // new
      sm: 'size-7 rounded-sm', // 28px, 유지
      md: 'size-8 rounded-md', // 32px, 유지
      lg: 'size-9.5 rounded-lg', // 40px -> 38px
      xl: 'size-12 rounded-xl', // new
      xxl: 'size-17 rounded-2xl', // new
    },
    variant: {
      dimmed: 'bg-[rgba(2,32,71,0.05)] disabled:text-[rgba(0,29,58,0.18)]',
      inline: '',
    },
  },
});

export const IconButton = ({
  children,
  size,
  className,
  variant = 'inline',
  ...props
}: React.PropsWithChildren<IconButtonProps>) => {
  return (
    <button className={cn(button({ size, variant }), className)} {...props}>
      {children}
    </button>
  );
};
