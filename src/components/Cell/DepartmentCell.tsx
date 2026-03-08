import { IcEditLine } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { PropsWithChildren } from 'react';

import { StyledContainer, StyledEditIcon } from '@/components/Cell/Cell.style.ts';
import DepartmentSearchDialog from '@/components/DepartmentSearchDialog/DepartmentSearchDialog.tsx';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';

interface DepartmentCellProps extends PropsWithChildren {
  disabled?: boolean;
  onSelect: (value: number) => void;
  tooltipContent: string;
}

const DepartmentCell = ({
  tooltipContent,
  children,
  onSelect,
  disabled = false,
}: DepartmentCellProps) => {
  if (disabled) {
    return (
      <StyledContainer $bold={false} $editable={false}>
        {children}
      </StyledContainer>
    );
  }

  return (
    <Popover.Root>
      <Popover.Anchor>
        <StyledContainer $bold={false} $editable={true}>
          {children}
          <Popover.Trigger asChild>
            <StyledEditIcon>
              <Tooltip content={tooltipContent}>
                <IcEditLine height={20} width={20} />
              </Tooltip>
            </StyledEditIcon>
          </Popover.Trigger>
        </StyledContainer>
      </Popover.Anchor>
      <DepartmentSearchDialog onSelect={onSelect} />
    </Popover.Root>
  );
};

export default DepartmentCell;
