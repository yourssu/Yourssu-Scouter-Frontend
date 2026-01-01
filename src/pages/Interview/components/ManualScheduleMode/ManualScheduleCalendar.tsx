import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';

interface ManualScheduleCalendarProps {
  month: number;
  week: number;
  year: number;
}

export const ManualScheduleCalendar = ({ month, week, year }: ManualScheduleCalendarProps) => {
  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {() => {
        return undefined;
      }}
    </InterviewCalendar>
  );
};
