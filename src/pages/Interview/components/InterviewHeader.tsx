import {
  IcArrowsChevronLeftLine,
  IcArrowsChevronRightLine,
  IcPlusLine,
} from '@yourssu/design-system-react';

import { PartFilterDropdown } from './PartFilterDropdown';

interface InterviewHeaderProps {
  month: number;
  onNextWeek: () => void;
  onPartChange: (partName: string) => void;
  onPrevWeek: () => void;
  partName: string;
  week: number;
}

export const InterviewHeader = ({
  month,
  week,
  onPrevWeek,
  onNextWeek,
  partName,
  onPartChange,
}: InterviewHeaderProps) => {
  return (
    <div className="border-line-basicMedium flex min-h-[48px] items-center justify-between border-b pr-[425px] pl-[45px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-[15px]">
          <span className="text-text-basicPrimary font-semibold">
            {month} 월 - {week} 주차
          </span>
          <div className="flex items-center gap-[7px]">
            <button
              className="border-line-basicMedium text-text-basicTertiary hover:text-text-basicPrimary flex h-[32px] items-center justify-center gap-[4px] rounded-[10px] border px-[8px] transition-colors"
              onClick={onPrevWeek}
              type="button"
            >
              <IcArrowsChevronLeftLine color="#000000" size="12px" />
            </button>
            <button
              className="border-line-basicMedium text-text-basicTertiary hover:text-text-basicPrimary flex h-[32px] items-center justify-center gap-[4px] rounded-[10px] border px-[8px] transition-colors"
              onClick={onNextWeek}
              type="button"
            >
              <IcArrowsChevronRightLine color="#000000" size="12px" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <PartFilterDropdown onPartChange={onPartChange} partName={partName} />
        <button
          className="flex h-[40px] items-center justify-between gap-[4px] rounded-xl bg-gray-800 px-[16px] text-sm text-white hover:bg-gray-700"
          type="button"
        >
          면접 일정 추가하기
          <IcPlusLine width="11.667px" />
        </button>
      </div>
    </div>
  );
};
