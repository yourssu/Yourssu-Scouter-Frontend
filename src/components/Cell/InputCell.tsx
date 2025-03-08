import {StyledEditIcon, StyledInput} from "@/components/Cell/Cell.style.ts";
import {IcEditLine} from "@yourssu/design-system-react";
import {ReactNode, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Cell from "@/components/Cell/Cell.tsx";

interface InputCellProps {
    children: ReactNode;
    defaultValue: string;
    handleSubmit: (value: string) => void;
    bold?: boolean;
}

const InputCell = ({children, defaultValue, handleSubmit, bold = false }: InputCellProps) => {
    const [editing, setEditing] = useState(false);
    const {register, setFocus, watch} = useForm({
        defaultValues: {
            value: defaultValue
        }
    })

    useEffect(() => {
        if (editing) setFocus('value');
    }, [editing, setFocus]);

    const onSubmit = () => {
        handleSubmit(watch('value'));
        setEditing(false);
    }

    return <Cell editable={true} bold={bold}>
        {editing ?
            <StyledInput
                {...register('value')}
                $bold={bold}
                onBlur={onSubmit}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onSubmit();
                }}
                defaultValue={defaultValue}
            />
            :
            <>
                <span>
                    {children}
                </span>
                <StyledEditIcon
                    onClick={() => setEditing(true)}
                >
                    <IcEditLine width={20} height={20}/>
                </StyledEditIcon>
            </>
        }
    </Cell>
}

export default InputCell;