import { useEffect, useRef } from 'react';

import { AutoSchedule } from '@/query/schedule/schema';
import { formatTemplates } from '@/utils/date';

interface AutoScheduleBlockProps {
  date: Date;
  isFirstBlock: boolean;
  schedule: AutoSchedule;
  shouldScrollIntoView?: boolean;
}

export const AutoScheduleBlock = ({
  schedule,
  date,
  isFirstBlock,
  shouldScrollIntoView,
}: AutoScheduleBlockProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shouldScrollIntoView && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [shouldScrollIntoView]);

  return (
    <button className="bg-bg-brandPrimary flex size-full flex-col rounded-lg text-white" ref={ref}>
      {isFirstBlock && (
        <>
          <div className="typo-c3_sb_11 flex size-full items-end gap-1.5 px-2">
            <div>{schedule.applicantName} 님</div>
            <div>{schedule.part}</div>
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
