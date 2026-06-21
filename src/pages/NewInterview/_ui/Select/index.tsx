import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { tv } from 'tailwind-variants';

import { Fieldset } from '@/pages/NewInterview/_ui/Fieldset';
import { cn } from '@/utils/dom';

// NOTE: legacy의 @/utils/tw(cn, tv) → cn(@/utils/dom) + tv(tailwind-variants) 로 분리.
// 색상 토큰은 Design.css hex/rgba 로 직접 주입.
// shadow-select* 토큰도 이 레포에 없어 Design.css 정의값을 임의값으로 직접 주입.
//   --shadow-select: 0 0 0 1px rgba(2,32,71,0.05), 0 10px 30px 0 rgba(2,32,71,0.05), 0 20px 40px 0 rgba(0,23,51,0.02)
//   --shadow-select-outline: inset 0 0 0 1px #e5e8eb
//   --shadow-select-outline-hover: inset 0 0 0 1px rgb(91,77,255,0.45)
export interface SelectProps<TValue extends string> {
  className?: string;
  contentProps?: SelectPrimitive.SelectContentProps;
  description?: React.ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  items: Readonly<TValue[]>;
  label?: React.ReactNode;
  onValueChange: (value: TValue) => void;
  placeholder: string;
  size: 'lg' | 'md' | 'sm' | 'xs';
  value: TValue | undefined;
  variant: 'dimmed' | 'inline' | 'outline';
}

const trigger = tv({
  base: 'ease-ease flex cursor-pointer items-center justify-between rounded-lg transition-colors duration-200 disabled:cursor-not-allowed disabled:text-[rgba(0,29,58,0.18)]',
  variants: {
    variant: {
      outline:
        'py-2 pr-[11px] pl-4 shadow-[inset_0_0_0_1px_#e5e8eb] transition-shadow enabled:hover:shadow-[inset_0_0_0_1px_rgb(91,77,255,0.45)]',
      dimmed: 'bg-[rgba(2,32,71,0.05)] py-2 pr-[11px] pl-4 enabled:hover:bg-[rgba(0,27,55,0.1)]',
      inline: 'enabled:hover:bg-[rgba(2,32,71,0.05)]',
    },
    size: {
      xs: 'h-6 pr-1 pl-2.5 text-[13px]',
      sm: 'h-7 pr-1.5 pl-3 text-[13px]',
      md: 'h-8 pr-2 pl-3 text-sm',
      lg: 'h-9.5 pr-[11px] pl-4 text-[15px]',
    },
    hasValue: {
      true: 'text-[rgba(0,12,30,0.8)]',
      false: 'text-[#b0b8c1]',
    },
    invalid: {
      true: 'border-[#f04452]',
      false: 'border-[#e5e8eb]',
    },
  },
  defaultVariants: {
    variant: 'inline',
    invalid: false,
  },
});

export const Select = <TValue extends string>({
  items,
  onValueChange,
  value,
  className,
  invalid,
  placeholder,
  disabled,
  size,
  variant,
  contentProps,
  label,
  description,
}: React.PropsWithChildren<SelectProps<TValue>>) => {
  /*
    NOTE: Radix-ui Select 컴포넌트의 값을 정확하게 초기화하려면 filter를 undefined 대신 ''로 설정해야 해요.
    이슈: https://github.com/radix-ui/primitives/issues/1569
    작업 PR: https://github.com/radix-ui/primitives/pull/2174
  */
  return (
    <Fieldset help={description} label={label}>
      <SelectPrimitive.Root onValueChange={onValueChange} value={value ?? ''}>
        <SelectPrimitive.Trigger asChild disabled={disabled}>
          <button className={cn(trigger({ variant, size, invalid, hasValue: !!value }), className)}>
            <div className="flex-1 truncate text-left">
              <SelectPrimitive.Value placeholder={placeholder} />
            </div>
            <SelectPrimitive.Icon className="ml-1 text-[#8b95a1] group-disabled:text-[rgba(0,29,58,0.18)]">
              <MdKeyboardArrowDown className="text-xl" />
            </SelectPrimitive.Icon>
          </button>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={8}
            {...contentProps}
            className={cn('z-50', contentProps?.className)}
          >
            <SelectPrimitive.Viewport className="max-h-80 w-full min-w-30 rounded-lg bg-[#ffffff] py-2 shadow-[0_0_0_1px_rgba(2,32,71,0.05),0_10px_30px_0_rgba(2,32,71,0.05),0_20px_40px_0_rgba(0,23,51,0.02)]">
              {items.map((item) => (
                <SelectPrimitive.Item
                  className={clsx(
                    'mx-2 min-h-10 cursor-pointer rounded-lg p-2 text-[15px] font-medium outline-0 hover:bg-[rgba(2,32,71,0.05)]',
                    item === value ? 'text-[#4a3fe0]' : 'text-[rgba(0,12,30,0.8)]',
                  )}
                  key={item}
                  value={item}
                >
                  <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </Fieldset>
  );
};
