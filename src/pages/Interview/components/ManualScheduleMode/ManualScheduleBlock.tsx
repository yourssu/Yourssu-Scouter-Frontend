import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { Applicant } from '@/query/applicant/schema';
import { formatTemplates } from '@/utils/date';

interface ManualScheduleBlockProps {
  applicant: Applicant | undefined;
  date: Date;
  isFirstBlock: boolean;
  onClick: () => void;
  shouldScrollIntoView?: boolean;
}

export const ManualScheduleBlock = ({
  applicant,
  date,
  isFirstBlock,
  onClick,
  shouldScrollIntoView,
}: ManualScheduleBlockProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shouldScrollIntoView && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [shouldScrollIntoView]);

  return (
    <button
      className={clsx(
        'bg-bg-brandPrimary flex size-full cursor-pointer flex-col rounded-lg text-white',
        !applicant && 'opacity-20 hover:opacity-60',
      )}
      onClick={onClick}
      ref={ref}
    >
      {applicant && isFirstBlock && (
        <>
          <div className="typo-c3_sb_11 flex size-full items-end gap-1.5 px-2">
            <div>{applicant.name} 님</div>
            <div>{applicant.part}</div>
          </div>
          <div className="typo-c3_rg_11 flex size-full items-start gap-1.5 px-2">
            <div>{formatTemplates['23:59'](date)}</div>
            <div>유어슈 동아리방</div>
          </div>
        </>
      )}
    </button>
  );
};
