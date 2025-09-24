import clsx from 'clsx';
import { LayoutGroup, motion } from 'motion/react';
import { useEffect, useId, useState } from 'react';

import { cn } from '@/utils/dom';

interface TabProps<TTab extends string> {
  children: (p: { tab: TTab }) => React.ReactNode;
  defaultTab: TTab;
  onTabChange?: (value: TTab) => void;
  tabListClassName?: string;
  tabs: TTab[];
}

export const Tab = <TTab extends string>({
  defaultTab,
  onTabChange,
  tabs,
  children,
  tabListClassName,
}: TabProps<TTab>) => {
  const id = useId();
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab, tabs]);

  return (
    <div className="w-full">
      <LayoutGroup id={id}>
        <div className={cn('flex w-full gap-8', tabListClassName)}>
          {tabs.map((item) => (
            <button
              className="size-fit cursor-pointer"
              key={item}
              onClick={() => {
                setTab(item);
                onTabChange?.(item);
              }}
            >
              <div className="relative flex w-fit py-4">
                <div
                  className={clsx(
                    'typo-b1_sb_16 transition-colors duration-250 ease-in-out',
                    item === tab ? 'text-text-basicPrimary' : 'text-text-basicTertiary',
                  )}
                >
                  {item}
                </div>
                {item === tab && (
                  <motion.div
                    className="bg-bg-basicBlack absolute bottom-0 h-0.5 w-full"
                    layoutId="tab-indicator"
                    transition={{
                      duration: 0.25,
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </LayoutGroup>
      {children({ tab })}
    </div>
  );
};
