import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useSearchState } from '@/hooks/useSearchState';
import { CalendarPaper } from '@/pages/NewInterview/components/CalendarPaper';
import { RecentScheduleButton } from '@/pages/NewInterview/components/RecentScheduleButton';
import { WeeklyCalendarGrid } from '@/pages/NewInterview/components/WeeklyCalendar/WeeklyCalendarGrid';
import { applicantOptions } from '@/query/applicant/options';
import { partOptions } from '@/query/part/options';
import { scheduleOptions } from '@/query/schedule/options';

export const WeeklyCalendar = () => {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [search] = useSearchState();
  // Todo: schedule에 applicantId를 포함하도록 백엔드 요청
  const [{ data: allSchedules }, { data: applicants }, { data: parts }] = useSuspenseQueries({
    queries: [
      {
        ...scheduleOptions(null),
        staleTime: 1000 * 60 * 10,
      },
      {
        ...applicantOptions(),
        staleTime: 1000 * 60 * 10,
      },
      partOptions(),
    ],
  });

  const pid = Number(search.get('pid'));

  const part = parts.find((p) => p.partId === pid);

  const schedules = useMemo(() => {
    if (!pid || !part) {
      return allSchedules;
    }
    return allSchedules.filter((s) => s.part === part.partName);
  }, [allSchedules, pid, part]);

  return (
    <CalendarPaper>
      <CalendarPaper.Header>
        <CalendarPaper.HeaderRow>
          <div className="flex items-center gap-2">
            <CalendarPaper.WeeklyIndicator date={displayDate} onDateChange={setDisplayDate} />
            <RecentScheduleButton onJump={setDisplayDate} schedules={schedules} />
          </div>
          <CalendarPaper.DurationSegmentedControl />
        </CalendarPaper.HeaderRow>
        <CalendarPaper.PartLegend />
      </CalendarPaper.Header>
      <CalendarPaper.Body>
        <WeeklyCalendarGrid
          applicants={applicants}
          displayDate={displayDate}
          schedules={schedules}
        />
      </CalendarPaper.Body>
    </CalendarPaper>
  );
};
