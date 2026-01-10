import { IcCloseFilled } from '@yourssu/design-system-react';
import { motion } from 'motion/react';
import { tv } from 'tailwind-variants';

const chip = tv({
  base: 'bg-chipUnselected text-text-basicSecondary typo-b3_rg_14 flex flex-row items-center justify-center gap-[4px] rounded-full px-3 py-1.5',
});

export const InputChipGroup = () => {
  const items: string[] = ['ex1', 'ex2', 'ex3'];
  return (
    <div className="flex flex-row items-center gap-2">
      {items.map((item) => (
        <motion.div className={chip()} key={item}>
          {item}
          <IcCloseFilled height={16} width={16} />
        </motion.div>
      ))}
    </div>
  );
};
