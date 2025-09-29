import { PageLayout } from '@/components/layouts/PageLayout';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar';

export const InterviewPage = () => {
  return (
    <PageLayout title="면접 일정 관리">
      {/* // Todo: month, week, year 상태로 변경 */}
      <InterviewCalendar month={9} week={2} year={2025} />
    </PageLayout>
  );
};
