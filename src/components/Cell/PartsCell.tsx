import { useSuspenseQuery } from '@tanstack/react-query';
import { IcEditLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { PropsWithChildren } from 'react';

import { StyledContainer, StyledEditIcon } from '@/components/Cell/Cell.style.ts';
import { GenericDialog } from '@/components/dialog/legacy/GenericDialog';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';
import { useElementWidth } from '@/hooks/useElementWidth.ts';
import { partOptions } from '@/query/part/options.ts';

interface PartsCellProps extends PropsWithChildren {
  onSelect: (value: string) => void;
  tooltipContent: string;
}

const PartsCell = ({ tooltipContent, children, onSelect }: PartsCellProps) => {
  const { data: parts } = useSuspenseQuery(partOptions());
  const options = parts.map((part) => ({ label: part.partName }));
  const { width, ref } = useElementWidth();

  return (
    <GenericDialog onSelect={onSelect} options={options} width={width}>
      <StyledContainer $bold={false} $editable={true} ref={ref}>
        {children}
        <Popover.Trigger asChild>
          <StyledEditIcon>
            <Tooltip content={tooltipContent}>
              <IcEditLine height={20} width={20} />
            </Tooltip>
          </StyledEditIcon>
        </Popover.Trigger>
      </StyledContainer>
    </GenericDialog>
  );
};

export default PartsCell;
