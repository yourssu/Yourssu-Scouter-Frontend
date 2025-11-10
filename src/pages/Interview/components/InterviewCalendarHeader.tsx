import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';

import { PartFilterDropdown } from './PartFilterDropdown';

interface InterviewCalendarHeaderProps {
  month: number;
  onNextWeek: () => void;
  onPartChange: (partName: string) => void;
  onPrevWeek: () => void;
  partName: string;
  week: number;
}

export const InterviewCalendarHeader = ({
  month,
  week,
  onPrevWeek,
  onNextWeek,
  partName,
  onPartChange,
}: InterviewCalendarHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between pl-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">
            {month}월 - {week} 주차
          </span>
          <div className="flex items-center gap-1">
            <button
              className="border-line-basicMedium text-text-basicTertiary hover:text-text-basicPrimary flex h-6 w-6 items-center justify-center rounded border transition-colors"
              onClick={onPrevWeek}
              type="button"
            >
              <IcArrowsChevronLeftLine size="16px" />
            </button>
            <button
              className="border-line-basicMedium text-text-basicTertiary hover:text-text-basicPrimary flex h-6 w-6 items-center justify-center rounded border transition-colors"
              onClick={onNextWeek}
              type="button"
            >
              <IcArrowsChevronRightLine size="16px" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <PartFilterDropdown onPartChange={onPartChange} partName={partName} />
        <button
          className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
          type="button"
        >
          면접 일정 추가하기
        </button>
      </div>
    </div>
  );
};
