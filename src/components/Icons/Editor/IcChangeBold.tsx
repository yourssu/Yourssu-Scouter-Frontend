import { BaseIconProps } from '@/components/Icons/type';

export const IcChangeBold = ({ width = 16, height = 16, ...props }: BaseIconProps) => {
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
        d="M4.5 3.16675H8.33333C9.71404 3.16675 10.8333 4.28604 10.8333 5.66675C10.8333 7.04746 9.71404 8.16675 8.33333 8.16675H4.5V3.16675Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 8.16675H9.16667C10.4553 8.16675 11.5 9.21142 11.5 10.5001C11.5 11.7887 10.4553 12.8334 9.16667 12.8334H4.5V8.16675Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
