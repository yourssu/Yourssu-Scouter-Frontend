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
        {names.map((name) => (
          <div key={name}>
            <Chip size="medium" role="input" data-chip={name}>
              <Chip.Content>{name}</Chip.Content>
              {onRemoveName && (
                <Chip.Remove onClick={() => handleRemoveName(name)} />
              )}
            </Chip>
          </div>
        ))}
      </NameTagsContainer>

      <SearchedMemberDialog
        onSelect={handleSelectMember}
        trigger={
          <StyledBoxButton
            size="xsmall"
            variant="outlined"
            rightIcon={<IcPlusLine width={12} />}
          >
            사람 변수 추가
          </StyledBoxButton>
        }
      />
    </VariableCard>
  );
};
