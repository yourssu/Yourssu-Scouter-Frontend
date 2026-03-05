import { Chip, TextField } from '@yourssu/design-system-react';

import { VariableCard } from './VariableCard';
import { InputContainer } from './VariableCard.style';
import { TextVariableCardProps } from './VariableCardType';

export const TextVariableCard = ({ title, texts, onValueChange }: TextVariableCardProps) => {
  const hasLabels = texts.some((text) => text.label);
  const count = hasLabels ? texts.length : undefined;

  const handleValueChange = (index: number, value: string) => {
    if (onValueChange) {
      onValueChange(index, value);
    }
  };

  return (
    <VariableCard count={count} title={title}>
      {texts.map((text, index) => (
        <InputContainer key={index}>
          {text.label && (
            <Chip role="input" size="medium" style={{ whiteSpace: 'nowrap' }}>
              {text.label}
            </Chip>
          )}
          <TextField
            onChange={(e) => handleValueChange(index, e.target.value)}
            onClearButtonClick={() => handleValueChange(index, '')}
            placeholder={'텍스트 변수 입력'}
            type="text"
            value={text.value}
          />
        </InputContainer>
      ))}
    </VariableCard>
  );
};
