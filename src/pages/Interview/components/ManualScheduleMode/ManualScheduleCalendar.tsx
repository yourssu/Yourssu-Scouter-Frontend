import { setHours, setMinutes } from 'date-fns';

import { useDateMap } from '@/hooks/useDateMap';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { ManualScheduleBlock } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleBlock';
import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleCalendarProps {
  month: number;
  selectedApplicant: Applicant;
  week: number;
  year: number;
}

export const ManualScheduleCalendar = ({
  selectedApplicant,
  month,
  week,
  year,
}: ManualScheduleCalendarProps) => {
  const [map] = useDateMap({
    initialEntries: selectedApplicant.availableTimes.map((time) => [new Date(time), true]),
    precision: '분',
  });

  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {({ date, hour, minute }) => {
        const targetDate = setMinutes(setHours(date, hour), minute);
        const isAvailable = map.has(targetDate);
        return isAvailable && <ManualScheduleBlock applicant={undefined} onClick={() => {}} />;
      }}
    </InterviewCalendar>
  );
};
