import { SwitchCase } from 'react-simplikit';

import { DateVariableCard } from '@/components/VariableCard/DateVariableCard';
import { LinkVariableCard } from '@/components/VariableCard/LinkVariableCard';
import { NameVariableCard } from '@/components/VariableCard/NameVariableCard';
import { TextVariableCard } from '@/components/VariableCard/TextVariableCard';
import { useVariableList } from '@/pages/SendMail/hooks/useVariableList';

interface VariableListProps {
  partId: number;
  templateId: number;
}

export const VariableList = ({ templateId, partId }: VariableListProps) => {
  const { variableCardData } = useVariableList(templateId, partId);

  return (
    <div className="flex flex-col gap-4 p-4">
      {variableCardData.map((card) => (
        <SwitchCase
          caseBy={{
            날짜: () => (
              <DateVariableCard
                dates={card.items}
                onDateChange={card.handleUpdate}
                title={card.title}
              />
            ),
            링크: () => (
              <LinkVariableCard
                links={card.items}
                onValueChange={card.handleUpdate}
                title={card.title}
              />
            ),
            사람: () => (
              <NameVariableCard
                names={card.names}
                onAddName={(val) => !card.isIndividual && card.handleUpdate(0, val)}
                title={card.title}
              />
            ),
            텍스트: () => (
              <TextVariableCard
                onValueChange={card.handleUpdate}
                texts={card.items}
                title={card.title}
              />
            ),
          }}
          key={card.key}
          value={card.type}
        />
      ))}
    </div>
  );
};
