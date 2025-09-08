import { Chip, TextField } from '@yourssu/design-system-react';

import { VariableCard } from './VariableCard';
import { InputContainer } from './VariableCard.style';
import { LinkVariableCardProps } from './VariableCardType';

export const LinkVariableCard = ({ title, links, onValueChange }: LinkVariableCardProps) => {
  const hasLabels = links.some((link) => link.label);
  const count = hasLabels ? links.length : undefined;

  const handleValueChange = (index: number, value: string) => {
    if (onValueChange) {
      onValueChange(index, value);
    }
  };

  return (
    <VariableCard count={count} title={title}>
      {links.map((link, index) => (
        <InputContainer key={index}>
          {link.label && (
            <Chip role="input" size="medium" style={{ whiteSpace: 'nowrap' }}>
              {link.label}
            </Chip>
          )}
          <TextField
            onChange={(e) => handleValueChange(index, e.target.value)}
            placeholder={'링크 변수 URL 입력'}
            type="url"
            value={link.value}
          />
        </InputContainer>
      ))}
    </VariableCard>
  );
};
