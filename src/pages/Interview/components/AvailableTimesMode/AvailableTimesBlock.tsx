import { tv } from 'tailwind-variants';

import { Applicant } from '@/query/applicant/schema';

interface AvailableTimesBlockProps {
  applicants: Applicant[];
  totalPartApplicants: number;
}

const block = tv({
  base: 'bg-bg-brandPrimary size-full rounded-lg',
  variants: {
    opacity: {
      light: 'opacity-20',
      small: 'opacity-40',
      medium: 'opacity-60',
      high: 'opacity-80',
      full: 'opacity-100',
    },
  },
});

export const AvailableTimesBlock = ({
  applicants,
  totalPartApplicants,
}: AvailableTimesBlockProps) => {
  const getOpacityLevel = () => {
    const ratio = applicants.length / totalPartApplicants;
    if (ratio <= 0.2) {
      return 'light' as const;
    }
    if (ratio <= 0.4) {
      return 'small' as const;
    }
    if (ratio <= 0.6) {
      return 'medium' as const;
    }
    if (ratio <= 0.8) {
      return 'high' as const;
    }
    return 'full' as const;
  };

  return <div className={block({ opacity: getOpacityLevel() })} />;
};
