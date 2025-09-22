import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeTextAlign = ({ width = 16, height = 16, ...props }: BaseIconProps) => {
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
        d="M5.16663 3.83325H10.8333M5.16663 12.1666H10.8333M3.16663 7.99992H12.8333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
