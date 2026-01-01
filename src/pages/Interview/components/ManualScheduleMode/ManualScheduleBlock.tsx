import clsx from 'clsx';

import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleBlockProps {
  applicant: Applicant | undefined;
  onClick: () => void;
}

export const ManualScheduleBlock = ({ applicant, onClick }: ManualScheduleBlockProps) => {
  return (
    <button
      className={clsx(
        'bg-bg-brandPrimary block size-full cursor-pointer rounded-lg',
        !applicant && 'opacity-20 hover:opacity-60',
      )}
      onClick={onClick}
    />
  );
};
