import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';

export const ManualScheduleSidebarPartCard = () => {
  const { partName } = useInterviewPartSelectionContext();

  return (
    <InterviewSidebarCard>
      <InterviewSidebarCard.Title>입력중인 파트</InterviewSidebarCard.Title>
      <InterviewSidebarCard.Content>
        <div className="typo-b2_rg_15 bg-chipUnselected inline-block rounded-full px-3 py-1.5">
          {partName}
        </div>
      </InterviewSidebarCard.Content>
    </InterviewSidebarCard>
  );
};
