import { Chip, TextField } from '@yourssu/design-system-react';
import { VariableCard } from './VariableCard';
import { InputContainer } from './VariableCard.style';
import { LinkVariableCardProps } from './VariableCardType';

export const LinkVariableCard = ({
  title,
  links,
  onValueChange,
}: LinkVariableCardProps) => {
  const hasLabels = links.some((link) => link.label);
  const count = hasLabels ? links.length : undefined;

  const handleValueChange = (index: number, value: string) => {
    if (onValueChange) {
      onValueChange(index, value);
    }
  };

  return (
    <VariableCard title={title} count={count}>
      {links.map((link, index) => (
        <InputContainer key={index}>
          {link.label && (
            <Chip size="medium" role="input" style={{ whiteSpace: 'nowrap' }}>
              {link.label}
            </Chip>
          )}
          <TextField
            type="url"
            value={link.value}
            placeholder={'링크 변수 URL 입력'}
            onChange={(e) => handleValueChange(index, e.target.value)}
          />
        </InputContainer>
      ))}
    </VariableCard>
  );
};
