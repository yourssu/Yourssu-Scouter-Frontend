import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeTextAlignRight = ({
  width = 16,
  height = 16,
  ...props
}: BaseIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 16 16"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.49996 3.83325H12.8333M6.49996 12.1666H12.8333M3.16663 7.99992H12.8333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
