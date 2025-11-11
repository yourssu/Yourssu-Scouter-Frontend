import { InterviewCalendarBody } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarBody';
import { InterviewCalendarHead } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarHead';

interface InterviewCalendarProps {
  month: number;
  partId: null | number;
  week: number;
  year: number;
}

export const InterviewCalendar = ({ month, week, year, partId }: InterviewCalendarProps) => {
  return (
    <div className="flex-[1_1_0] overflow-y-auto pl-6">
      <table className="w-full border-collapse border-spacing-0">
        <InterviewCalendarHead month={month} week={week} year={year} />
        <InterviewCalendarBody month={month} partId={partId} week={week} year={year} />
      </table>
    </div>
  );
};
