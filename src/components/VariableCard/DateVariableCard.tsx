import { Chip, IcCalenderLine, TextField } from '@yourssu/design-system-react';
import { CalendarDialog } from './CalendarDialog';
import { VariableCard } from './VariableCard';
import {
  IconWrapper,
  InputContainer,
  TextFieldContainer,
} from './VariableCard.style';
import { DateVariableCardProps } from './VariableCardType';

export const DateVariableCard = ({
  title,
  dates,
  onDateChange,
}: DateVariableCardProps) => {
  const hasLabels = dates.some((date) => date.label);
  const count = hasLabels ? dates.length : undefined;

  const handleDateSelection = (index: number, selectedDate: string) => {
    if (onDateChange) {
      onDateChange(index, selectedDate);
    }
  };

  const handleDateClear = (index: number) => {
    if (onDateChange) {
      onDateChange(index, '');
    }
  };

  return (
    <VariableCard title={title} count={count}>
      {dates.map((date, index) => (
        <InputContainer key={index}>
          {date.label && (
            <Chip size="medium" role="input" style={{ whiteSpace: 'nowrap' }}>
              {date.label}
            </Chip>
          )}
          <CalendarDialog
            selectedDate={date.value}
            onSelect={(selectedDate) =>
              handleDateSelection(index, selectedDate)
            }
            trigger={
              <TextFieldContainer
                onClick={(e) => {
                  if (date.value) {
                    e.stopPropagation();
                  }
                }}
              >
                <TextField
                  type="text"
                  key={`date-field-${index}-${date.value}`}
                  value={date.value}
                  placeholder="MM/DD(D) HH:MM"
                  readOnly
                  onClearButtonClick={() => handleDateClear(index)}
                />
                {!date.value && (
                  <IconWrapper>
                    <IcCalenderLine width={20} />
                  </IconWrapper>
                )}
              </TextFieldContainer>
            }
          />
        </InputContainer>
      ))}
    </VariableCard>
  );
};
