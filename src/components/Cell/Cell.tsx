import { PropsWithChildren } from 'react';

import { StyledContainer } from '@/components/Cell/Cell.style.ts';

interface CellProps extends PropsWithChildren {
  bold?: boolean;
  editable?: boolean;
}

const Cell = ({ bold = false, editable = false, children }: CellProps) => {
  return (
    <StyledContainer $bold={bold} $editable={editable}>
      {children}
    </StyledContainer>
  );
};

export default Cell;
