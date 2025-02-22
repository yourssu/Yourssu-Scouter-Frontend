import {StyledContainer, StyledEditIcon} from "@/components/Cell/Cell.style.ts";
import {IcEditLine} from "@yourssu/design-system-react";
import {GenericDialog} from "@/components/dialog/GenericDialog.tsx";
import {ReactNode, useEffect, useRef, useState} from "react";
import {useGetParts} from "@/hooks/useGetParts.ts";

interface DepartmentCellProps {
    onSelect: (value: string) => void;
    children: ReactNode;
}

const DepartmentCell = ({onSelect, children}: DepartmentCellProps) => {
    const {data: parts} = useGetParts();
    const options = parts.map(part => ({label: part.partName}));
    const ref = useRef<HTMLSpanElement | null>(null);
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    }, []);

    return <GenericDialog onSelect={onSelect} options={options} width={width}>
        {(triggerProps) => (
            <StyledContainer
                $bold={false}
                ref={ref}
            >
                {children}
                <StyledEditIcon
                    {...triggerProps}
                >
                    <IcEditLine width={20} height={20}/>
                </StyledEditIcon>
            </StyledContainer>
        )}
    </GenericDialog>
}

export default DepartmentCell;