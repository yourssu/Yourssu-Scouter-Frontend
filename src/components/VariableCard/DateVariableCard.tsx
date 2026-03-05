import { Chip, IcCalenderLine, TextField } from '@yourssu/design-system-react';
import { parse, setYear } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

import { formatTemplates } from '@/utils/date';

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
              handleDateSelection(
                index,
                formatTemplates['01/01(월) 00:00'](setYear(selectedDate, new Date().getFullYear())),
              )
            }
            selectedDate={
              date.value
                ? parse(date.value, 'MM/dd(E) HH:mm', new Date(), { locale: ko })
                : undefined
            }
            trigger={
              <TextFieldContainer>
                {/* 트리거와 TextField 사이에 이벤트를 가로채기 위한 div 사용 */}
                <div
                  className="w-full"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    // 삭제 버튼(button, svg, path)을 클릭한 경우에만 부모 트리거로 이벤트가 가지 않게 막음
                    if (
                      target.closest('button') ||
                      target.tagName === 'svg' ||
                      target.tagName === 'path'
                    ) {
                      e.stopPropagation();
                    }
                  }}
                  onPointerDown={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                      target.closest('button') ||
                      target.tagName === 'svg' ||
                      target.tagName === 'path'
                    ) {
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
                </div>

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
