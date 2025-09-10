import { Chip, IcCalenderLine, TextField } from '@yourssu/design-system-react';

import { formatTemplates } from '@/components/CalendarDialog/date';

import { CalendarDialog } from '../CalendarDialog/CalendarDialog';
import { VariableCard } from './VariableCard';
import { IconWrapper, InputContainer, TextFieldContainer } from './VariableCard.style';
import { DateVariableCardProps } from './VariableCardType';

export const DateVariableCard = ({ title, dates, onDateChange }: DateVariableCardProps) => {
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
    <VariableCard count={count} title={title}>
      {dates.map((date, index) => (
        <InputContainer key={index}>
          {date.label && (
            <Chip role="input" size="medium" style={{ whiteSpace: 'nowrap' }}>
              {date.label}
            </Chip>
          )}
          <CalendarDialog
            onSelect={(selectedDate) =>
              handleDateSelection(index, formatTemplates['01/01(월) 00:00'](selectedDate))
            }
          >
            <TextFieldContainer
              onClick={(e) => {
                if (date.value) {
                  e.stopPropagation();
                }
              }}
            >
              <TextField
                key={`date-field-${index}-${date.value}`}
                onClearButtonClick={() => handleDateClear(index)}
                placeholder="MM/DD(D) HH:MM"
                readOnly
                type="text"
                value={date.value}
              />
              {!date.value && (
                <IconWrapper>
                  <IcCalenderLine width={20} />
                </IconWrapper>
              )}
            </TextFieldContainer>
          </CalendarDialog>
        </InputContainer>
      ))}
    </VariableCard>
  );
};
