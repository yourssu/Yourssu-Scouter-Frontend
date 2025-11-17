import { IcPlusLine } from '@yourssu/design-system-react';

import { useCalendarModeContext } from '@/pages/Interview/context';

export const InterviewScheduleAddButton = () => {
  const { setCalendarMode } = useCalendarModeContext();

  return (
    <button
      className="flex h-[40px] items-center justify-between gap-[4px] rounded-xl bg-gray-800 px-[16px] text-sm text-white hover:bg-gray-700"
      onClick={() => setCalendarMode({ type: '희망일정보기' })}
      type="button"
    >
      면접 일정 추가하기
      <IcPlusLine width="11.667px" />
    </button>
  );
};
