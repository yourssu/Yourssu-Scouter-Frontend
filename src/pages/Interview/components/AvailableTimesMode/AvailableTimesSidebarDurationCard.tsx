import { IcArrowsChevronDownLine, IcCheckLine, IcClockFilled } from '@yourssu/design-system-react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';

interface SelectItemProps {
  selected?: boolean;
  value: string;
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

const SelectItem = ({ value, selected }: SelectItemProps) => {
  const { container, content, title, icon, value: valueStyle, valueContainer } = item();

  return (
    <button className={container()}>
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
  const { content, title, icon, value: valueStyle, valueContainer } = item();

  return (
    <InterviewSidebarCard>
      <InterviewSidebarCard.Title rightIcon={<IcArrowsChevronDownLine className="size-6" />}>
        <div className={clsx(content())}>
          <div className={clsx(title())}>면접 시간</div>
          <div className={clsx(valueContainer())}>
            <IcClockFilled className={clsx(icon({ selected: true }))} />
            <div className={clsx(valueStyle({ selected: true }))}>1 hour</div>
          </div>
        </div>
      </InterviewSidebarCard.Title>

      {/* // Todo: Divider, VerticalDivider 컴포넌트로 공통화? */}
      <div className="bg-line-basicMedium h-[1px] w-full" />

      <SelectItem value="30 minutes" />
      <SelectItem selected value="1 hour" />
    </InterviewSidebarCard>
  );
};
