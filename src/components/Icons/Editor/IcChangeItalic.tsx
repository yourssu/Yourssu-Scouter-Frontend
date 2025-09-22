import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeItalic = ({ width = 16, height = 16, ...props }: BaseIconProps) => {
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
        d="M9.33329 3.16675H7.83329M9.33329 3.16675H10.8333M9.33329 3.16675L6.66663 12.8334M6.66663 12.8334H5.16663M6.66663 12.8334H8.16663"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
