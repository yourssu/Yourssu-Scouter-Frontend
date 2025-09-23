import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeFont = ({ width = 20, height = 20, ...props }: BaseIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 20 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.1667 6.83325V5.83325H5.83337V6.83325M10 5.99992V14.1666M10 14.1666H9.16671M10 14.1666H10.8334"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
