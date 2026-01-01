import { setHours, setMinutes } from 'date-fns';

import { useDateMap, UseDateMapAction } from '@/hooks/useDateMap';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { ManualScheduleBlock } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleBlock';
import { Applicant } from '@/query/applicant/schema';
import { DateMap } from '@/utils/DateMap';

interface ManualScheduleCalendarProps {
  completedScheduleMap: DateMap<Applicant>;
  completedScheduleMapAction: UseDateMapAction<Applicant>;
  month: number;
  selectedApplicant: Applicant;
  week: number;
  year: number;
}

export const ManualScheduleCalendar = ({
  selectedApplicant,
  completedScheduleMap,
  completedScheduleMapAction,
  month,
  week,
  year,
}: ManualScheduleCalendarProps) => {
  const [map] = useDateMap({
    initialEntries: selectedApplicant.availableTimes.map((time) => [new Date(time), true]),
    precision: '분',
  });

  const meAlreadySettedAt = completedScheduleMap
    .entries()
    .find(([, { applicantId }]) => applicantId === selectedApplicant.applicantId)?.[0];

  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {({ date, hour, minute }) => {
        const targetDate = setMinutes(setHours(date, hour), minute);
        const isAvailable = map.has(targetDate);
        const settedApplicantHere = completedScheduleMap.get(targetDate);
        const settedApplicantHereIsMe =
          settedApplicantHere?.applicantId === selectedApplicant.applicantId;

        return (
          (isAvailable || settedApplicantHere) && (
            <ManualScheduleBlock
              applicant={settedApplicantHere}
              date={targetDate}
              onClick={() => {
                // 1. 클릭한 블럭에 채워져있는 게 내 일정이라면 지운다
                if (settedApplicantHereIsMe) {
                  completedScheduleMapAction.remove(targetDate);
                  return;
                }
                // 2. 내 일정이 다른곳에서 이미 지정되어있다면 클릭한 블럭으로 변경한다
                if (meAlreadySettedAt) {
                  completedScheduleMapAction.remove(meAlreadySettedAt);
                  completedScheduleMapAction.set(targetDate, selectedApplicant);
                  return;
                }
                // 3. 클릭한 블럭에 아무도 채워져있지 않다면 채운다
                if (!settedApplicantHere) {
                  completedScheduleMapAction.set(targetDate, selectedApplicant);
                  return;
                }
              }}
            />
          )
        );
      }}
    </InterviewCalendar>
  );
};
