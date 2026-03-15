import { setHours, setMinutes, subMinutes } from 'date-fns';

import { useDateMap, UseDateMapAction } from '@/hooks/useDateMap';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { ScheduledApplicant } from '@/pages/Interview/components/ManualScheduleMode/index';
import { ManualScheduleBlock } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleBlock';
import { useInterviewAutoScheduleContext } from '@/pages/Interview/context';
import { Applicant } from '@/query/applicant/schema';
import { DateMap } from '@/utils/DateMap';

interface ManualScheduleCalendarProps {
  completedScheduleMap: DateMap<ScheduledApplicant>;
  completedScheduleMapAction: UseDateMapAction<ScheduledApplicant>;
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
  const { duration } = useInterviewAutoScheduleContext();

  const [map] = useDateMap({
    initialEntries: selectedApplicant.availableTimes.map((time) => [new Date(time), true]),
    precision: '분',
  });

  const meAlreadySettedAt = completedScheduleMap
    .entries()
    .find(([, { applicantId }]) => applicantId === selectedApplicant.applicantId)?.[0];

  const targetScrollTime =
    meAlreadySettedAt?.getTime() ??
    (selectedApplicant.availableTimes.length > 0
      ? Math.min(...selectedApplicant.availableTimes.map((time) => new Date(time).getTime()))
      : null);

  return (
    <InterviewCalendar month={month} week={week} year={year}>
      {({ date, hour, minute }) => {
        const targetDate = setMinutes(setHours(date, hour), minute);
        const isAvailable = map.has(targetDate);

        let settedApplicantHere = completedScheduleMap.get(targetDate);
        let actualScheduleDate = targetDate;

        if (!settedApplicantHere && duration === '1시간') {
          const prevBlock = subMinutes(targetDate, 30);
          const prevApplicant = completedScheduleMap.get(prevBlock);
          if (prevApplicant) {
            settedApplicantHere = prevApplicant;
            actualScheduleDate = prevBlock;
          }
        }

        const settedApplicantHereIsMe =
          settedApplicantHere?.applicantId === selectedApplicant.applicantId;

        return (
          (isAvailable || settedApplicantHere) && (
            <ManualScheduleBlock
              applicant={settedApplicantHere}
              date={actualScheduleDate}
              isFirstBlock={actualScheduleDate.getTime() === targetDate.getTime()}
              locationDetail={settedApplicantHere?.locationDetail}
              locationType={settedApplicantHere?.locationType}
              onClick={() => {
                // 1. 클릭한 블럭에 채워져있는 게 내 일정이라면 지운다
                if (settedApplicantHereIsMe) {
                  completedScheduleMapAction.remove(actualScheduleDate);
                  return;
                }
                // 2. 내 일정이 다른곳에서 이미 지정되어있다면 클릭한 블럭으로 변경한다
                if (meAlreadySettedAt) {
                  const myScheduledData = completedScheduleMap.get(meAlreadySettedAt);
                  completedScheduleMapAction.remove(meAlreadySettedAt);
                  completedScheduleMapAction.set(targetDate, myScheduledData ?? selectedApplicant);
                  return;
                }
                // 3. 클릭한 블럭에 아무도 채워져있지 않다면 채운다
                if (!settedApplicantHere) {
                  completedScheduleMapAction.set(targetDate, selectedApplicant);
                  return;
                }
              }}
              shouldScrollIntoView={targetScrollTime === targetDate.getTime()}
            />
          )
        );
      }}
    </InterviewCalendar>
  );
};
