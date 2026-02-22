import {
  IcArrowsChevronDownLine,
  IcArrowsChevronUpLine,
  IcCameraFilled,
  IcCheckFilled,
  IcUserFilled,
} from '@yourssu/design-system-react';
import clsx from 'clsx';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

import { InterviewSidebarCard } from '@/pages/Interview/components/InterviewSidebarCard';

interface SelectHeaderProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  value: '대면' | '비대면';
}

interface SelectItemProps {
  onSelect: (v: '대면' | '비대면') => void;
  selected?: boolean;
  value: '대면' | '비대면';
}

const item = tv({
  slots: {
    container: 'bg-bg-basicDefault flex w-full cursor-pointer items-center justify-between',
    content: 'hover:bg-gray100/50 flex w-full items-center gap-2 rounded-lg py-1 pr-2 pl-1',
    icon: 'text-icon-brandPrimary invisible size-4',
  },
  variants: {
    selected: {
      true: {
        icon: 'visible',
      },
    },
  },
});

const METHOD_ICONS = {
  대면: IcUserFilled,
  비대면: IcCameraFilled,
};

const SelectHeader = ({ onOpenChange, open, value }: SelectHeaderProps) => {
  const ArrowIcon = open ? IcArrowsChevronUpLine : IcArrowsChevronDownLine;
  const MethodIcon = METHOD_ICONS[value] || IcUserFilled;

  return (
    <InterviewSidebarCard.Title
      className="cursor-pointer"
      onClick={() => onOpenChange(!open)}
      rightIcon={<ArrowIcon className="text-icon-basicSecondary size-6" />}
    >
      <div className="flex w-full flex-1 items-center gap-3">
        <div className="typo-b1_sb_16 text-text-basicSecondary">면접 방식</div>
        <div className="flex items-center">
          <div className="text-icon-brandPrimary size-4">
            <MethodIcon className="size-full" />
          </div>
          <div className="flex items-center justify-center px-2">
            <p className="typo-b3_rg_14 text-text-brandPrimary">{value}</p>
          </div>
        </div>
      </div>
    </InterviewSidebarCard.Title>
  );
};

const SelectItem = ({ value, selected, onSelect }: SelectItemProps) => {
  const { container, content, icon } = item();
  const MethodIcon = METHOD_ICONS[value] || IcUserFilled;

  return (
    <button className={container()} onClick={() => onSelect(value)}>
      <div className={content()}>
        <div className="flex items-center justify-center gap-2 pl-1">
          <div className="text-icon-basicSecondary size-4">
            <MethodIcon className="size-full" />
          </div>
          <span className="typo-b3_sb_14 text-text-basicSecondary">{value}</span>
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

export interface ManualScheduleSidebarMethodCardProps {
  method: '대면' | '비대면';
  onChangeMethod: (method: '대면' | '비대면') => void;
}

export const ManualScheduleSidebarMethodCard = ({
  method,
  onChangeMethod,
}: ManualScheduleSidebarMethodCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <InterviewSidebarCard>
      <SelectHeader onOpenChange={setOpen} open={open} value={method} />
      {open && (
        <>
          <div className="bg-line-basicMedium h-[1px] w-full" />
          <div className="flex flex-col gap-1">
            {(['대면', '비대면'] as const).map((v) => (
              <SelectItem
                key={v}
                onSelect={(val) => {
                  onChangeMethod(val);
                  setOpen(false);
                }}
                selected={method === v}
                value={v}
              />
            ))}
          </div>
        </>
      )}
    </InterviewSidebarCard>
  );
};
