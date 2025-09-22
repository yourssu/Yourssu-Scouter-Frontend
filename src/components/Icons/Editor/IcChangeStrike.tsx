import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeStrike = ({ width = 16, height = 16, ...props }: BaseIconProps) => {
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
        d="M3.16663 8.16659H12.8333M12.1666 5.49992V5.33325C12.1666 4.22868 11.2712 3.33325 10.1666 3.33325H5.83329C4.72872 3.33325 3.83329 4.22868 3.83329 5.33325V6.16659C3.83329 7.27115 4.72872 8.16659 5.83329 8.16659H9.99996M3.83329 10.4999V10.8333C3.83329 11.9378 4.72872 12.8333 5.83329 12.8333H10.1666C11.2712 12.8333 12.1666 11.9378 12.1666 10.8333V9.83325"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
