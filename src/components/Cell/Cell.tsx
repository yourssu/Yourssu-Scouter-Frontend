import { StyledContainer } from '@/components/Cell/Cell.style.ts';

import { PropsWithChildren } from 'react';

interface CellProps extends PropsWithChildren {
  bold?: boolean;
  editable?: boolean;
}

const Cell = ({ bold = false, editable = false, children }: CellProps) => {
  return (
    <StyledContainer $editable={editable} $bold={bold}>
      {children}
    </StyledContainer>
  );
};

export default Cell;
