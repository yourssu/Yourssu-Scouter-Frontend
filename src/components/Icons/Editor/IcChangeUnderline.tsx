import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeUnderline = ({ width = 16, height = 16, ...props }: BaseIconProps) => {
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
        d="M3.16663 12.8333H12.8333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10.8333 3.16675V7.33341C10.8333 8.89822 9.56477 10.1667 7.99996 10.1667C6.43515 10.1667 5.16663 8.89822 5.16663 7.33341V3.16675"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
