import { setHours, setMinutes } from 'date-fns';

import { useDateMap } from '@/hooks/useDateMap';
import { AutoScheduleBlock } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleBlock';
import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { useInterviewAutoScheduleContext } from '@/pages/Interview/context';

interface AutoScheduleCalendarProps {
  month: number;
  scheduleCandidate: AutoScheduleCandidate;
  week: number;
  year: number;
}

export const AutoScheduleCalendar = ({
  scheduleCandidate,
  month,
  week,
  year,
}: AutoScheduleCalendarProps) => {
  const { duration } = useInterviewAutoScheduleContext();

  const [map] = useDateMap({
    initialEntries: scheduleCandidate.schedules.map((v) => [new Date(v.startTime), v]),
    precision: duration === '1시간' ? '시간' : '분',
  });

  const earliestScheduleTime =
    scheduleCandidate.schedules.length > 0
      ? Math.min(...scheduleCandidate.schedules.map((s) => new Date(s.startTime).getTime()))
      : null;

  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {({ date, hour, minute }) => {
        const targetDate = setMinutes(setHours(date, hour), minute);
        const schedule = map.get(targetDate);

        return (
          !!schedule && (
            <AutoScheduleBlock
              date={targetDate}
              isFirstBlock={duration === '30분' || (duration === '1시간' && minute === 0)}
              schedule={schedule}
              shouldScrollIntoView={earliestScheduleTime === targetDate.getTime()}
            />
          )
        );
      }}
    </InterviewCalendar>
  );
};
