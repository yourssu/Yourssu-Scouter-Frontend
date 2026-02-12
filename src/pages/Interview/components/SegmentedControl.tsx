import { motion } from 'motion/react';
import { useId } from 'react';
import { tv } from 'tailwind-variants';

interface SegmentedControlProps<T extends string> {
  disabled?: boolean;
  onChange: (value: T) => void;
  options: T[];
  value: T;
}

const segment = tv({
  slots: {
    activeIndicator: 'absolute inset-0 rounded-md bg-white shadow-sm',
    container: 'relative flex h-fit w-fit rounded-lg bg-gray-100 p-1',
    item: 'relative z-10 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 select-none',
  },
  variants: {
    disabled: {
      true: {
        container: 'cursor-not-allowed opacity-50',
        item: 'cursor-not-allowed',
      },
    },
    isActive: {
      false: {
        item: 'text-gray-500 hover:text-gray-900',
      },
      true: {
        item: 'text-gray-900',
      },
    },
  },
});

export const SegmentedControl = <T extends string>({
  disabled,
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) => {
  const { activeIndicator, container, item } = segment({ disabled });
  const id = useId();

  return (
    <div className={container()}>
      {options.map((option) => {
        const isActive = value === option;
        return (
          <button
            className={item({ isActive })}
            disabled={disabled}
            key={option}
            onClick={() => !disabled && onChange(option)}
            type="button"
          >
            {isActive && (
              <motion.div
                className={activeIndicator()}
                layoutId={`segment-indicator-${id}`}
                transition={{ damping: 30, stiffness: 500, type: 'spring' }}
              />
            )}
            <span className="relative z-20">{option}</span>
          </button>
        );
      })}
    </div>
  );
};
