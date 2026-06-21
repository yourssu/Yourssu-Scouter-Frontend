import { startTransition } from 'react';

import { useSearchState } from '@/hooks/useSearchState';
import { SegmentedControl } from '@/pages/Interview/components/SegmentedControl';
import {
  MonthlyIndicator,
  WeeklyIndicator,
} from '@/pages/NewInterview/components/CalendarPaper/DateIndicator';
import { DivisionLegend, PartLegend } from '@/pages/NewInterview/components/CalendarPaper/Legend';
import { cn } from '@/utils/dom';

const Body = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex flex-col">{children}</div>;
};

const DurationSegmentedControl = () => {
  const [search, setSearch] = useSearchState();

  const ct = search.get('ct') ?? '월별';

  return (
    <SegmentedControl
      onChange={(value) =>
        startTransition(() => {
          setSearch((prev) => ({ ...Object.fromEntries(prev), ct: value }));
        })
      }
      options={['월별', '주별']}
      value={ct}
    />
  );
};

const HeaderRow = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full items-center justify-between">{children}</div>;
};

const PaperHeader = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="sticky top-0 z-30 flex flex-col bg-[#ffffff] py-6">{children}</div>;
};

export const CalendarPaper = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className="flex-[1_1_0] pb-9">
      <div className={cn('rounded-2xl bg-[#ffffff] p-6 pt-0', className)}>{children}</div>
    </div>
  );
};

CalendarPaper.Header = PaperHeader;
CalendarPaper.HeaderRow = HeaderRow;
CalendarPaper.DivisionLegend = DivisionLegend;
CalendarPaper.PartLegend = PartLegend;
CalendarPaper.DurationSegmentedControl = DurationSegmentedControl;
CalendarPaper.WeeklyIndicator = WeeklyIndicator;
CalendarPaper.MonthlyIndicator = MonthlyIndicator;
CalendarPaper.Body = Body;
