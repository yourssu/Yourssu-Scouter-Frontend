import { IcCloseFilled } from '@yourssu/design-system-react';
import { motion } from 'motion/react';
import { tv } from 'tailwind-variants';

const chip = tv({
  base: 'bg-chipUnselected text-text-basicSecondary typo-b3_rg_14 flex flex-row items-center justify-center gap-[4px] rounded-full px-3 py-1.5',
});

interface InputChipGroupProps {
  deletable: boolean;
  items: string[];
  onItemsUpdate: (items: string[]) => void;
}

export const InputChipGroup = ({ items = [], deletable, onItemsUpdate }: InputChipGroupProps) => {
  return (
    <div className="contents items-center gap-2">
      {items.map((item) => (
        <motion.div className={chip()} key={item}>
          {item}
          {deletable && (
            <IcCloseFilled
              height={16}
              onClick={() => onItemsUpdate(items.filter((i) => i !== item))}
              width={16}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
