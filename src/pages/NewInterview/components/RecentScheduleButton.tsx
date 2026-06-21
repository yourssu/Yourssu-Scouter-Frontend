import { InlineButton } from '@/pages/NewInterview/_ui/InlineButton';
import { Schedule } from '@/query/schedule/schema';

interface RecentScheduleButtonProps {
  onJump: (date: Date) => void;
  schedules: Schedule[];
}

/**
 * 클릭하면 현재 시각 기준 가장 최근 과거 일정(startTime이 now 이하이면서 가장
 * 늦은 일정)의 월/주차로 displayDate를 이동시킵니다. 과거 일정이 없으면 비활성화됩니다.
 */
export const RecentScheduleButton = ({ schedules, onJump }: RecentScheduleButtonProps) => {
  const now = Date.now();
  const pastSchedules = schedules.filter(
    (schedule) => new Date(schedule.startTime).getTime() <= now,
  );

  const handleClick = () => {
    if (pastSchedules.length === 0) {
      return;
    }
    const recent = pastSchedules.reduce((closest, current) =>
      new Date(current.startTime).getTime() > new Date(closest.startTime).getTime()
        ? current
        : closest,
    );
    onJump(new Date(recent.startTime));
  };

  return (
    <InlineButton
      className="text-[13px] font-medium text-[#4e5968] disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pastSchedules.length === 0}
      onClick={handleClick}
    >
      마지막 일정 보기
    </InlineButton>
  );
};
