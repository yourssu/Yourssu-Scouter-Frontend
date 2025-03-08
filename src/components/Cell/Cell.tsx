import {StyledContainer} from "@/components/Cell/Cell.style.ts";

import {ReactNode} from "react";

interface CellProps {
    bold?: boolean;
    editable?: boolean;
    children: ReactNode;
}

const Cell = ({bold = false, editable = false, children}: CellProps) => {
    return <StyledContainer $editable={editable} $bold={bold}>
        {children}
    </StyledContainer>
}

export default Cell;