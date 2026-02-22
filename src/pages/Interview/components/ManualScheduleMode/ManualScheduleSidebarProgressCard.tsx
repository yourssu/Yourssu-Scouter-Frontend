import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleSidebarProgressCardProps {
  completedApplicants: [Date, Applicant][];
  totalApplicantCount: number;
}

export const ManualScheduleSidebarProgressCard = ({
  completedApplicants,
  totalApplicantCount,
}: ManualScheduleSidebarProgressCardProps) => {
  return (
    <InterviewSidebarCard>
      <InterviewSidebarCard.Title>
        입력완료{' '}
        <span className="text-text-brandPrimary">
          ( {completedApplicants.length} / {totalApplicantCount} )
        </span>
      </InterviewSidebarCard.Title>
      {completedApplicants.length > 0 ? (
        <div className="flex w-full flex-col gap-3">
          {completedApplicants.map(([date, { name, applicantId }]) => (
            <div className="flex h-10 w-full items-center gap-2" key={applicantId}>
              <div className="typo-b3_rg_14 bg-chipUnselected text-text-basicSecondary flex items-center rounded-[40px] px-3 py-1.5">
                {name}
              </div>
              <p className="typo-b1_rg_16 text-text-basicPrimary overflow-hidden text-ellipsis whitespace-nowrap">
                {format(date, 'MM/dd(E) HH:mm', { locale: ko })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <InterviewSidebarCard.Content>지원자의 일정을 지정해주세요.</InterviewSidebarCard.Content>
      )}
    </InterviewSidebarCard>
  );
};
