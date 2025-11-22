import {
  IcArrowsChevronDownLine,
  IcArrowsChevronUpLine,
  IcCheckLine,
  IcClockFilled,
} from '@yourssu/design-system-react';
import clsx from 'clsx';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';
import { useInterviewAutoScheduleContext } from '@/pages/Interview/context';
import { interviewDurationOptions, InterviewDurationType } from '@/pages/Interview/type';

interface SelectHeaderProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  value: InterviewDurationType;
}

interface SelectItemProps<TValue extends InterviewDurationType> {
  onSelect: (v: TValue) => void;
  selected?: boolean;
  value: TValue;
}

const item = tv({
  slots: {
    container: 'flex w-full cursor-pointer items-center justify-between',
    content: 'flex items-center gap-3',
    title: 'typo-b1_sb_16 text-text-basicSecondary',
    valueContainer: 'flex items-center',
    icon: 'text-icon-brandPrimary invisible size-4',
    value: 'typo-b3_rg_14 text-text-basicTertiary px-2',
  },
  variants: {
    selected: {
      true: {
        value: 'text-text-brandPrimary',
        icon: 'visible',
      },
    },
  },
});

const SelectHeader = ({ onOpenChange, open, value }: SelectHeaderProps) => {
  const { content, title, icon, value: valueStyle, valueContainer } = item();

  const Icon = open ? IcArrowsChevronUpLine : IcArrowsChevronDownLine;

  return (
    <InterviewSidebarCard.Title
      className="cursor-pointer"
      onClick={() => onOpenChange(!open)}
      rightIcon={<Icon className="size-6" />}
    >
      <div className={clsx(content())}>
        <div className={clsx(title())}>면접 시간</div>
        <div className={clsx(valueContainer())}>
          <IcClockFilled className={clsx(icon({ selected: true }))} />
          <div className={clsx(valueStyle({ selected: true }))}>{value}</div>
        </div>
      </div>
    </InterviewSidebarCard.Title>
  );
};

const SelectItem = <TValue extends InterviewDurationType>({
  value,
  selected,
  onSelect,
}: SelectItemProps<TValue>) => {
  const { container, content, title, icon, value: valueStyle, valueContainer } = item();

  return (
    <button className={container()} onClick={() => onSelect(value)}>
      <div className={clsx(content())}>
        <div className={clsx(title(), 'invisible')}>면접 시간</div>
        <div className={clsx(valueContainer())}>
          <IcCheckLine className={clsx(icon({ selected }))} />
          <div className={clsx(valueStyle({ selected }))}>{value}</div>
        </div>
      </div>
    </button>
  );
};

export const AvailableTimesSidebarDurationCard = () => {
  const [open, setOpen] = useState(false);
  const { duration, setDuration } = useInterviewAutoScheduleContext();

  return (
    <InterviewSidebarCard>
      <SelectHeader onOpenChange={setOpen} open={open} value={duration} />
      {open && (
        <>
          {/* // Todo: Divider, VerticalDivider 컴포넌트로 공통화? */}
          <div className="bg-line-basicMedium h-[1px] w-full" />
          {interviewDurationOptions.map((v) => (
            <SelectItem key={v} onSelect={setDuration} selected={duration === v} value={v} />
          ))}
        </>
      )}
    </InterviewSidebarCard>
  );
};
