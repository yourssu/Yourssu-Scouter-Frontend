import { IcEditLine } from '@yourssu/design-system-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StyledEditIcon, StyledInput } from '@/components/Cell/Cell.style.ts';
import Cell from '@/components/Cell/Cell.tsx';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';

interface InputCellProps extends PropsWithChildren {
  bold?: boolean;
  defaultValue: string;
  disabled?: boolean;
  handleSubmit: (value: string) => void;
  tooltipContent: string;
}

const InputCell = ({
  tooltipContent,
  children,
  defaultValue,
  handleSubmit,
  bold = false,
  disabled = false,
}: InputCellProps) => {
  const [editing, setEditing] = useState(false);
  const { register, setFocus, watch } = useForm({
    defaultValues: {
      value: defaultValue,
    },
  });

  useEffect(() => {
    if (editing && !disabled) {
      setFocus('value');
    }
  }, [editing, setFocus, disabled]);

  const onSubmit = () => {
    if (disabled) {
      return;
    }
    handleSubmit(watch('value'));
    setEditing(false);
  };

  return (
    <Cell bold={bold} editable={!disabled}>
      {editing && !disabled ? (
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
          {!disabled && (
            <StyledEditIcon onClick={() => setEditing(true)}>
              <Tooltip content={tooltipContent}>
                <IcEditLine height={20} width={20} />
              </Tooltip>
            </StyledEditIcon>
          )}
        </>
      )}
    </Cell>
  );
};

export default InputCell;
