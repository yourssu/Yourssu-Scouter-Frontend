import { useSuspenseQuery } from '@tanstack/react-query';
import { StateButton } from '@/components/StateButton/StateButton.tsx';
import { partOptions } from '@/query/part/options.ts';
import {
  IcArrowsChevronDownLine,
  IcFilterBarLine,
} from '@yourssu/design-system-react';

export const PartStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const { data: states } = useSuspenseQuery(partOptions());
  const options = states.map((state) => ({ label: state.partName }));

  return (
    <StateButton
      options={options}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      size="medium"
      variant="outlined"
      rightIcon={<IcArrowsChevronDownLine />}
      leftIcon={<IcFilterBarLine />}
    />
  );
};
