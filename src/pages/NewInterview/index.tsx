import { BoxButton } from '@yourssu/design-system-react';
import { useNavigate } from 'react-router';

import { useSearchState } from '@/hooks/useSearchState';
import { MonthlyCalendar } from '@/pages/NewInterview/components/MonthlyCalendar';
import { WeeklyCalendar } from '@/pages/NewInterview/components/WeeklyCalendar';

export const NewInterviewPage = () => {
  const navigate = useNavigate();
  const [search] = useSearchState();
  const calendarType = search.get('ct') ?? '월별';

  return (
    <div className="flex size-full flex-col">
      <div className="mb-2 flex w-full items-center justify-between pr-6 pl-10">
        <h1 className="typo-h3_sb_32">면접 일정 관리</h1>
        <BoxButton onClick={() => navigate('new')} size="medium" variant="filledPrimary">
          일정 추가
        </BoxButton>
      </div>

      <div className="w-full pr-2 pl-6">
        {calendarType === '주별' ? <WeeklyCalendar /> : <MonthlyCalendar />}
      </div>
    </div>
  );
};
