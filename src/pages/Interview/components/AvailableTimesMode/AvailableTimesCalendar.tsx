import { setHours, setMinutes } from 'date-fns';

import { useDateMap } from '@/hooks/useDateMap';
import { AvailableTimesBlock } from '@/pages/Interview/components/AvailableTimesMode/AvailableTimesBlock';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { Applicant } from '@/query/applicant/schema';

interface AvailableTimesCalendarProps {
  availableApplicants: Applicant[];
  month: number;
  week: number;
  year: number;
}

type AvailableApplicantEntry = [Date, Applicant[]];

export const AvailableTimesCalendar = ({
  month,
  week,
  year,
  availableApplicants,
}: AvailableTimesCalendarProps) => {
  const makeAvailableApplicantEntries = (applicant: Applicant): AvailableApplicantEntry[] => {
    return applicant.availableTimes.map((time) => [new Date(time), [applicant]]);
  };

  const [map] = useDateMap({
    initialEntries: availableApplicants.flatMap(makeAvailableApplicantEntries),
    precision: '분',
  });

  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {({ date, hour, minute }) => {
        const targetDate = setMinutes(setHours(date, hour), minute);
        const applicants = map.get(targetDate) ?? [];
        return (
          applicants.length > 0 && (
            <AvailableTimesBlock
              applicants={applicants}
              totalPartApplicants={availableApplicants.length}
            />
          )
        );
      }}
    </InterviewCalendar>
  );
};
