import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine, IcFilterBarLine } from '@yourssu/design-system-react';

import { StateButton } from '@/components/StateButton/StateButton.tsx';
import { partOptions } from '@/query/part/options.ts';

export const PartStateButton = ({
  selectedValue,
  onStateChange,
}: {
  onStateChange: (value: string) => void;
  selectedValue: string;
}) => {
  const { data: states } = useSuspenseQuery(partOptions());
  const options = states.map((state) => ({ label: state.partName }));

  return (
    <StateButton
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
