import { IcArrowsChevronLeftLine, IcArrowsChevronRightLine } from '@yourssu/design-system-react';

interface IndicatorProps {
  date: {
    month: number;
    week: number;
  };
  disabled?: boolean;
  onNextWeek: () => void;
  onPrevWeek: () => void;
}

const Row = ({ children }: React.PropsWithChildren) => {
  return <div className="flex w-full items-center justify-between">{children}</div>;
};

const ButtonGroup = ({ children }: React.PropsWithChildren) => {
  return <div className="flex gap-2">{children}</div>;
};

const Indicator = ({ onNextWeek, onPrevWeek, date, disabled }: IndicatorProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-[15px]">
        <span className="text-text-basicPrimary font-semibold">
          {date.month} 월 - {date.week} 주차
        </span>
        <div className="flex items-center gap-[7px]">
          <button
            className="border-line-basicMedium text-text-basicTertiary hover:text-text-basicPrimary flex h-[32px] items-center justify-center gap-[4px] rounded-[10px] border px-[8px] transition-colors disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={onPrevWeek}
            type="button"
          >
            <IcArrowsChevronLeftLine color="#000000" size="12px" />
          </button>
          <button
            className="border-line-basicMedium text-text-basicTertiary hover:text-text-basicPrimary flex h-[32px] items-center justify-center gap-[4px] rounded-[10px] border px-[8px] transition-colors disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={onNextWeek}
            type="button"
          >
            <IcArrowsChevronRightLine color="#000000" size="12px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const InterviewHeaderLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border-line-basicMedium min-h-[48px] w-full border-b">
      <div className="flex h-full w-[70%] flex-col pl-[45px]">{children}</div>
    </div>
  );
};

InterviewHeaderLayout.Row = Row;
InterviewHeaderLayout.Indicator = Indicator;
InterviewHeaderLayout.ButtonGroup = ButtonGroup;
