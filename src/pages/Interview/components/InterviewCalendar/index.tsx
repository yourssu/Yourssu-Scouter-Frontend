import { InterviewCalendarBody } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarBody';
import { InterviewCalendarHead } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarHead';

interface InterviewCalendarProps {
  month: number;
  week: number;
  year: number;
}

export const InterviewCalendar = ({ month, week, year }: InterviewCalendarProps) => {
  return (
    <div className="flex-[1_1_0] overflow-y-auto">
      <table className="w-full border-collapse border-spacing-0">
        <InterviewCalendarHead month={month} week={week} year={year} />
        <InterviewCalendarBody />
      </table>
    </div>
  );
};
