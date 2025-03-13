import { StyledEditIcon, StyledInput } from '@/components/Cell/Cell.style.ts';
import { IcEditLine } from '@yourssu/design-system-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cell from '@/components/Cell/Cell.tsx';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';

interface InputCellProps extends PropsWithChildren {
  defaultValue: string;
  handleSubmit: (value: string) => void;
  bold?: boolean;
  tooltipContent: string;
}

const InputCell = ({
  tooltipContent,
  children,
  defaultValue,
  handleSubmit,
  bold = false,
}: InputCellProps) => {
  const [editing, setEditing] = useState(false);
  const { register, setFocus, watch } = useForm({
    defaultValues: {
      value: defaultValue,
    },
  });

  useEffect(() => {
    if (editing) setFocus('value');
  }, [editing, setFocus]);

  const onSubmit = () => {
    handleSubmit(watch('value'));
    setEditing(false);
  };

  return (
    <Cell editable={true} bold={bold}>
      {editing ? (
        <StyledInput
          {...register('value')}
          $bold={bold}
          onBlur={onSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit();
          }}
          defaultValue={defaultValue}
        />
      ) : (
        <>
          <span>{children}</span>
          <StyledEditIcon onClick={() => setEditing(true)}>
            <Tooltip content={tooltipContent}>
              <IcEditLine width={20} height={20} />
            </Tooltip>
          </StyledEditIcon>
        </>
      )}
    </Cell>
  );
};

export default InputCell;
