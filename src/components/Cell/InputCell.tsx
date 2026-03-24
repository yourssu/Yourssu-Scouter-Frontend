import { IcEditLine } from '@yourssu/design-system-react';
import { HoverCard } from 'radix-ui';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { StyledEditIcon, StyledInput } from '@/components/Cell/Cell.style.ts';
import Cell from '@/components/Cell/Cell.tsx';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';

const StyledFullTextContent = styled.div`
  max-width: 360px;
  padding: 10px 14px;
  background: #373a43;
  border-radius: ${({ theme }) => theme.semantic.radius.xs}px;
  color: ${({ theme }) => theme.semantic.color.textBasicWhite};
  ${({ theme }) => theme.typo.B2_Rg_15};
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.6;
  z-index: 100;
`;

interface InputCellProps extends PropsWithChildren {
  bold?: boolean;
  defaultValue: string;
  disabled?: boolean;
  handleSubmit: (value: string) => void;
  tooltipContent: string;
  truncate?: boolean;
}

const InputCell = ({
  tooltipContent,
  children,
  defaultValue,
  handleSubmit,
  bold = false,
  disabled = false,
  truncate = false,
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
          {truncate ? (
            <HoverCard.Root closeDelay={100} openDelay={300}>
              <HoverCard.Trigger asChild>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  {children}
                </span>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content align="start" side="bottom" sideOffset={6}>
                  <StyledFullTextContent>{children}</StyledFullTextContent>
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          ) : (
            <span>{children}</span>
          )}
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
