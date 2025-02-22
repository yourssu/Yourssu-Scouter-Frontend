import {IcEditLine} from "@yourssu/design-system-react";
import {GenericDialog} from "@/components/dialog/GenericDialog.tsx";
import {useGetParts} from "@/hooks/useGetParts.ts";
import {ReactNode, useEffect, useRef, useState} from "react";
import {StyledContainer, StyledEditIcon} from "@/components/Cell/Cell.style.ts";

interface PartsCellProps {
    onSelect: (value: string) => void;
    children: ReactNode;
}

const PartsCell = ({children, onSelect}: PartsCellProps) => {
    const {data: parts} = useGetParts();
    const options = parts.map(part => ({label: part.partName}));
    const ref = useRef<HTMLSpanElement | null>(null);
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    }, []);

    return <GenericDialog width={width} options={options} onSelect={onSelect}>
        {(triggerProps) => (
            <StyledContainer ref={ref}>
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

export default PartsCell;