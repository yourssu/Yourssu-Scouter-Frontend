import { IcEditLine } from '@yourssu/design-system-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StyledEditIcon, StyledInput } from '@/components/Cell/Cell.style.ts';
import Cell from '@/components/Cell/Cell.tsx';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';

interface InputCellProps extends PropsWithChildren {
  bold?: boolean;
  defaultValue: string;
  handleSubmit: (value: string) => void;
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
    if (editing) {
      setFocus('value');
    }
  }, [editing, setFocus]);

  const onSubmit = () => {
    handleSubmit(watch('value'));
    setEditing(false);
  };

  return (
    <Cell bold={bold} editable={true}>
      {editing ? (
        <StyledInput
          {...register('value')}
          $bold={bold}
          defaultValue={defaultValue}
          onBlur={onSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
        />
      ) : (
        <>
          <span>{children}</span>
          <StyledEditIcon onClick={() => setEditing(true)}>
            <Tooltip content={tooltipContent}>
              <IcEditLine height={20} width={20} />
            </Tooltip>
          </StyledEditIcon>
        </>
      )}
    </Cell>
  );
};

export default InputCell;
