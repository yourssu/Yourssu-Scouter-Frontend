import { Chip, IcPlusLine } from '@yourssu/design-system-react';

import { SearchedMemberDialog } from '../SearchedMemberDialog/SearchedMemberDialog';
import { VariableCard } from './VariableCard';
import { NameTagsContainer, StyledBoxButton } from './VariableCard.style';
import { NameVariableCardProps } from './VariableCardType';

export const NameVariableCard = ({
  title,
  names = [],
  onAddName,
  onRemoveName,
}: NameVariableCardProps) => {
  const handleSelectMember = (nickname: string) => {
    if (onAddName) {
      onAddName(nickname);
    }
  };

  const handleRemoveName = (nameToRemove: string) => {
    if (onRemoveName) {
      onRemoveName(nameToRemove);
    }
  };

  return (
    <VariableCard title={title}>
      <NameTagsContainer>
        {names
          .filter((name) => name.trim() !== '')
          .map((name) => (
            <div key={name}>
              <Chip data-chip={name} role="input" size="medium">
                <Chip.Content>{name}</Chip.Content>
                {onRemoveName && <Chip.Remove onClick={() => handleRemoveName(name)} />}
              </Chip>
            </div>
          ))}
      </NameTagsContainer>

      <SearchedMemberDialog
        onSelect={handleSelectMember}
        trigger={
          <StyledBoxButton rightIcon={<IcPlusLine width={12} />} size="xsmall" variant="outlined">
            사람 변수 추가
          </StyledBoxButton>
        }
      />
    </VariableCard>
  );
};
