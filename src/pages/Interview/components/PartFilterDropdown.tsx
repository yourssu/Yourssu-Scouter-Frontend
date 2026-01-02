import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';

import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { partOptions } from '@/query/part/options';

const PART_COLORS: Record<string, string> = {
  HR: '#25262C',
  Finance: 'yellow',
  PM: '#FFBB7F',
  Marketing: '#FF9797',
  Legal: '#FFE597',
  Backend: '#7C7C7C',
  Android: '#F4A3DB',
  iOS: '#A3EAF4',
  'Web FE': '#B8F4A3',
  'Product Design': '#6B5CFF',
};

export const PartFilterDropdown = () => {
  const { data: parts } = useSuspenseQuery(partOptions());
  const { partName, onPartChange } = useInterviewPartSelectionContext();

  const displayName = partName ?? '전체일정 보기';
  const selectedColor = (partName ? PART_COLORS[partName] : '#ECEFFF') ?? '#E3E4E8';

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="border-line-basicMedium text-text-basicPrimary flex h-[40px] min-w-40 items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm hover:bg-gray-50 data-[state=open]:rounded-b-none"
          type="button"
        >
          <div className="size-2.5 rounded-full" style={{ backgroundColor: selectedColor }} />
          <span>{displayName}</span>
          <IcArrowsChevronDownLine size="16px" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="border-line-basicMedium bg-bg-basicDefault z-50 min-w-40 rounded-b-xl border"
          sideOffset={0}
        >
          <div className="flex w-40 flex-col px-4 py-0">
            {/* 전체일정 보기 */}
            <button
              className="flex items-center justify-between py-2.5"
              onClick={() => onPartChange('전체일정 보기')}
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: '#ECEFFF' }} />
                <span className="typo-b3_sb_14 text-text-basicTertiary">전체일정 보기</span>
              </div>
            </button>

            {/* 파트 목록 */}
            {parts.map((part) => (
              <button
                className="flex items-center gap-1.5 py-0"
                key={part.partId}
                onClick={() => onPartChange(part.partName)}
                type="button"
              >
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: PART_COLORS[part.partName] || '#E3E4E8' }}
                />
                <div className="bg-button-textSecondary-enabled flex h-9 w-28 items-center rounded-lg px-2">
                  <span className="typo-b3_sb_14 text-text-basicTertiary">{part.partName}</span>
                </div>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
