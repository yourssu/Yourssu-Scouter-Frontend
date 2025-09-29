import { InterviewCalendarHead } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarHead';

interface InterviewCalendarProps {
  month: number;
  week: number;
  year: number;
}

export const InterviewCalendar = ({ month, week, year }: InterviewCalendarProps) => {
  return (
    <table className="w-full border-collapse border-spacing-0">
      <InterviewCalendarHead month={month} week={week} year={year} />
    </table>
  );
};
