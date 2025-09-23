import { BaseIconProps } from '@/components/Icons/type';

export const IcChangePhoto = ({ width = 16, height = 16, ...props }: BaseIconProps) => {
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
        d="M3.16663 10.6667L4.99742 8.33787C5.51656 7.67749 6.50964 7.65589 7.05702 8.29306L8.66663 10.1667M7.27666 8.54874C7.96809 7.66919 8.93152 6.42312 8.9942 6.34204L9.00085 6.33352C9.52093 5.6774 10.5108 5.65729 11.057 6.29306L12.6666 8.16675M4.49996 3.16675H11.5C12.2363 3.16675 12.8333 3.7637 12.8333 4.50008V11.5001C12.8333 12.2365 12.2363 12.8334 11.5 12.8334H4.49996C3.76358 12.8334 3.16663 12.2365 3.16663 11.5001V4.50008C3.16663 3.7637 3.76358 3.16675 4.49996 3.16675Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
