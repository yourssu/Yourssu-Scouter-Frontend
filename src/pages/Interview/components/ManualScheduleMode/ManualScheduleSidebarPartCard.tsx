import { useSuspenseQuery } from '@tanstack/react-query';
import {
  IcArrowsChevronDownLine,
  IcArrowsChevronUpLine,
  IcCheckFilled,
} from '@yourssu/design-system-react';
import clsx from 'clsx';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';
import { useInterviewPartSelectionContext } from '@/pages/Interview/context';
import { applicantOptions } from '@/query/applicant/options';
import { partOptions } from '@/query/part/options';
import { semesterNowOptions } from '@/query/semester/now/options';

interface SelectHeaderProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  value: null | string;
}

interface SelectItemProps {
  onSelect: (v: string) => void;
  selected?: boolean;
  value: string;
}

const item = tv({
  slots: {
    container: 'flex w-full cursor-pointer items-center justify-between',
    content: 'flex w-full items-center gap-2 rounded-lg px-2',
    title: 'typo-b1_sb_16 text-text-basicSecondary',
    valueContainer: 'flex items-center',
    icon: 'text-icon-brandPrimary invisible size-4',
    value: 'typo-b3_sb_14 text-text-basicTertiary px-2',
  },
  variants: {
    selected: {
      true: {
        icon: 'visible',
      },
    },
  },
});

const SelectHeader = ({ onOpenChange, open, value }: SelectHeaderProps) => {
  const { content, title, value: valueStyle, valueContainer } = item();

  const Icon = open ? IcArrowsChevronUpLine : IcArrowsChevronDownLine;

  return (
    <InterviewSidebarCard.Title
      className="cursor-pointer"
      onClick={() => onOpenChange(!open)}
      rightIcon={<Icon className="size-6" />}
    >
      <div className={clsx(content())}>
        <div className={clsx(title())}>파트 선택</div>
        <div className={clsx(valueContainer())}>
          {value ? (
            <>
              <div
                className="ml-1 size-2.5 rounded-full"
                style={{ backgroundColor: PART_COLORS[value] }}
              />
              <div className={clsx(valueStyle())}>{value}</div>
            </>
          ) : (
            <span className="typo-b3_sb_14 text-text-basicTertiary">
              파트를 선택해 주세요 (필수)
            </span>
          )}
        </div>
      </div>
    </InterviewSidebarCard.Title>
  );
};

const SelectItem = ({ value, selected, onSelect }: SelectItemProps) => {
  const { container, content, icon } = item();

  return (
    <button className={container()} onClick={() => value && onSelect(value)}>
      <div className={clsx(content(), 'hover:bg-gray100/50')}>
        <div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: PART_COLORS[value] || '#E3E4E8' }}
        />
        <div className="bg-button-textSecondary-enabled flex h-9 w-28 items-center rounded-lg px-2">
          <span className="typo-b3_sb_14 text-text-basicTertiary">{value}</span>
        </div>
        {selected && (
          <div className={clsx(icon({ selected }), 'flex flex-[1_1_0] items-center justify-end')}>
            <IcCheckFilled className="size-4" />
          </div>
        )}
      </div>
    </button>
  );
};

export const ManualScheduleSidebarPartCard = () => {
  const [open, setOpen] = useState(false);
  const { partName, onPartChange } = useInterviewPartSelectionContext();
  const { data: parts } = useSuspenseQuery(partOptions());
  const { data: semesterNow } = useSuspenseQuery(semesterNowOptions());
  const { data: applicants } = useSuspenseQuery({
    ...applicantOptions({ semesterId: semesterNow.semesterId }),
    select: (v) => v.filter(({ state }) => state === '심사 진행 중'),
  });

  const partsWithApplicants = new Set(applicants.map((a) => a.part));

  return (
    <InterviewSidebarCard>
      <SelectHeader onOpenChange={setOpen} open={open} value={partName} />
      {open && (
        <>
          <div className="bg-line-basicMedium h-[1px] w-full" />
          {parts
            .map((v) => v.partName)
            .filter((v) => partsWithApplicants.has(v))
            .map((v) => (
              <SelectItem
                key={v}
                onSelect={(v) => {
                  onPartChange(v);
                  setOpen(false);
                }}
                selected={partName === v}
                value={v}
              />
            ))}
        </>
      )}
    </InterviewSidebarCard>
  );
};

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
