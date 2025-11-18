import { InterviewCalendarBody } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarBody';
import { InterviewCalendarHead } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendarHead';

interface InterviewCalendarProps {
  children: (p: { date: Date; hour: number; minute: number }) => React.ReactNode;
  month: number;
  week: number;
  year: number;
}

export const InterviewCalendar = ({ month, week, year, children }: InterviewCalendarProps) => {
  return (
    <div className="flex-[1_1_0] overflow-y-auto pl-6">
      <table className="w-full border-collapse border-spacing-0">
        <InterviewCalendarHead month={month} week={week} year={year} />
        <InterviewCalendarBody month={month} week={week} year={year}>
          {children}
        </InterviewCalendarBody>
      </table>
    </div>
  );
};
