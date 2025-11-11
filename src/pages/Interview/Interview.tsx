import { useState } from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';
import { usePartFilter } from '@/hooks/usePartFilter';
import { InterviewCalendar } from '@/pages/Interview/components/InterviewCalendar/InterviewCalendar';
import { InterviewHeader } from '@/pages/Interview/components/InterviewHeader';
import { InterviewSidebar } from '@/pages/Interview/components/InterviewSidebar';

export const InterviewPage = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [week, setWeek] = useState(2);

  const { partId, partName, onPartChange } = usePartFilter();

  const handlePrevWeek = () => {
    if (week > 0) {
      setWeek(week - 1);
    } else if (month > 1) {
      setMonth(month - 1);
      setWeek(4);
    } else {
      setYear(year - 1);
      setMonth(12);
      setWeek(4);
    }
  };

  const handleNextWeek = () => {
    if (week < 4) {
      setWeek(week + 1);
    } else if (month < 12) {
      setMonth(month + 1);
      setWeek(0);
    } else {
      setYear(year + 1);
      setMonth(1);
      setWeek(0);
    }
  };

  return (
    <PageLayout title="면접 일정 관리">
      <InterviewHeader
        month={month}
        onNextWeek={handleNextWeek}
        onPartChange={onPartChange}
        onPrevWeek={handlePrevWeek}
        partName={partName}
        week={week}
      />
      <div className="flex h-full gap-6 overflow-hidden">
        <div className="flex min-w-0 flex-col" style={{ width: '70%' }}>
          <InterviewCalendar month={month} partId={partId} week={week} year={year} />
        </div>
        <div className="flex-1">
          <InterviewSidebar />
        </div>
      </div>
    </PageLayout>
  );
};
