import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleSidebarProgressCardProps {
  completedApplicants: Applicant[];
  totalApplicantCount: number;
}

export const ManualScheduleSidebarProgressCard = ({
  completedApplicants,
  totalApplicantCount,
}: ManualScheduleSidebarProgressCardProps) => {
  return (
    <InterviewSidebarCard>
      <InterviewSidebarCard.Title>
        입력완료 지원자{' '}
        <span className="text-text-brandPrimary">
          ( {completedApplicants.length} / {totalApplicantCount} )
        </span>
      </InterviewSidebarCard.Title>
      <InterviewSidebarCard.Content>
        {completedApplicants.length
          ? completedApplicants.map(({ name, applicantId }) => (
              <div
                className="typo-b2_rg_15 bg-chipUnselected inline-block rounded-full px-3 py-1.5"
                key={applicantId}
              >
                {name}
              </div>
            ))
          : '지원자의 일정을 지정해주세요.'}
      </InterviewSidebarCard.Content>
    </InterviewSidebarCard>
  );
};
