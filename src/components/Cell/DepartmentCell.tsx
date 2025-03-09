import { IcEditLine } from '@yourssu/design-system-react';
import {
  StyledContainer,
  StyledEditIcon,
} from '@/components/Cell/Cell.style.ts';
import { ReactNode } from 'react';
import DepartmentSearchDialog from '@/components/DepartmentSearchDialog/DepartmentSearchDialog.tsx';
import { Popover } from 'radix-ui';

interface DepartmentCellProps {
  onSelect: (value: number) => void;
  children: ReactNode;
}

const DepartmentCell = ({ children, onSelect }: DepartmentCellProps) => {
  return (
    <Popover.Root>
      <Popover.Anchor>
        <StyledContainer $bold={false} $editable={true}>
          {children}
          <Popover.Trigger asChild>
            <StyledEditIcon>
              <IcEditLine width={20} height={20} />
            </StyledEditIcon>
          </Popover.Trigger>
        </StyledContainer>
      </Popover.Anchor>
      <DepartmentSearchDialog onSelect={onSelect} />
    </Popover.Root>
  );
};

export default DepartmentCell;
