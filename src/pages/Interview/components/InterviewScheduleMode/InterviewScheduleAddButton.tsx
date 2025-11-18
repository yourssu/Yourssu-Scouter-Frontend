import { IcPlusLine } from '@yourssu/design-system-react';

import { useInterviewCalendarModeContext } from '@/pages/Interview/context';

export const InterviewScheduleAddButton = () => {
  const { setCalendarMode } = useInterviewCalendarModeContext();

  return (
    <button
      className="flex h-10 items-center justify-between gap-1 rounded-xl bg-gray-800 px-4 text-sm text-white hover:bg-gray-700"
      onClick={() => setCalendarMode('희망일정')}
      type="button"
    >
      면접 일정 추가하기
      <IcPlusLine className="size-3" />
    </button>
  );
};
