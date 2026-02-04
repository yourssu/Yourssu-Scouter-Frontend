import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine, IcFilterBarLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';

import { StateButton } from '@/components/StateButton/StateButton.tsx';
import { partOptions } from '@/query/part/options.ts';

export const PartStateButton = ({
  selectedValue,
  onStateChange,
  contentProps,
}: {
  contentProps?: Popover.PopoverContentProps;
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: states } = useSuspenseQuery(partOptions());
  const options = states.map((state) => ({ label: state.partName }));

  return (
    <StateButton
      contentProps={contentProps}
      leftIcon={<IcFilterBarLine />}
      onSelect={onStateChange}
      options={options}
      rightIcon={<IcArrowsChevronDownLine />}
      selectedValue={selectedValue}
      size="medium"
      variant="outlined"
      width={160}
    />
  );
};
