import { tv } from 'tailwind-variants';

import { useCalendarWeekDates } from '@/hooks/useCalendarWeekDates';
import { formatTemplates } from '@/utils/date';

interface InterviewCalendarHeadProps {
  month: number;
  week: number;
  year: number;
}

/* 
  HTML table의 border-collapse 스펙은 sticky 속성을 완벽히 지원하지 않는 문제가 있어요.
  sticky가 트리거되더라도, border는 스크롤 위치를 그대로 유지하고 있어 border가 따로 노는 현상이 발생해요.
  따라서 헤더 셀들의 border는 border-collapse의 영향을 받지 않도록 따로 분리해줘요. (cellBorder 참고)

  - calc(100%+1px/2): 
  table 내부의 셀들은 border-collapse의 영향을 받 border를 그리는 방식이 달라요.
  따라서 border가 뒤틀리는 현상이 발생하는데, 이를 보정하기 위해 <border-width>/2를 더해줬어요.
*/
const cell = tv({
  slots: {
    cellContainer: 'h-[44px] min-w-[150px] flex-[1_1] first:min-w-[72px]',
    cellBorder: 'border-line-basicMedium h-full w-[calc(100%+1px/2)] border-y border-r',
    cellContent: 'typo-b1_rg_16 text-text-basicTertiary flex size-full items-center justify-center',
  },
  variants: {
    first: {
      true: {
        cellBorder: 'border-l',
      },
    },
    collapse: {
      true: {
        cellBorder: 'h-[calc(100%+1px/2)]',
      },
    },
  },
});

export const InterviewCalendarHead = ({ month, week, year }: InterviewCalendarHeadProps) => {
  const { cellContainer, cellBorder, cellContent } = cell();
  const weekDates = useCalendarWeekDates({
    month,
    week,
    year,
  }).map((v) => formatTemplates['Mon 12'](v).split(' '));

  return (
    <thead className="border-line-basicMedium shadow-fabPrimary sticky top-0 z-50 bg-white">
      <tr>
        <th className={cellContainer()}>
          <div className={cellBorder({ first: true })}>
            <div className={cellContent()}>TIME</div>
          </div>
        </th>
        {weekDates.map(([dayName, day]) => (
          <th className={cellContainer()} key={dayName}>
            <div className={cellBorder({ collapse: true })}>
              <div className={cellContent()}>
                <div>{dayName}</div>
                <div className="typo-b1_sb_16 text-text-basicPrimary ml-[7px]">{day}</div>
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
