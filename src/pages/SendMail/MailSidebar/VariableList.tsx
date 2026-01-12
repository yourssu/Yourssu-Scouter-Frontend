import { SwitchCase } from 'react-simplikit';

import { DateVariableCard } from '@/components/VariableCard/DateVariableCard';
import { LinkVariableCard } from '@/components/VariableCard/LinkVariableCard';
import { NameVariableCard } from '@/components/VariableCard/NameVariableCard';
import { TextVariableCard } from '@/components/VariableCard/TextVariableCard';
import { Variable, VariableKeyType } from '@/types/editor';

interface VariableListProps {
  onUpdateVariable: (key: VariableKeyType, updatedItems: Variable['items']) => void;
  variables: Variable[];
}

export const VariableList = ({ variables, onUpdateVariable }: VariableListProps) => {
  const resolvedVariables = variables.map((v) => ({
    ...v,
    items: v.items ?? (v.type === '사람' ? [] : [{ value: '' }]),
  }));
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      {resolvedVariables.map(({ key, items, displayName, type }) => {
        const handleItemChange = (index: number, value: string) => {
          const newItem = { ...items[index], value };
          onUpdateVariable(key, [...items].toSpliced(index, 1, newItem));
        };
        const handleItemAdd = (value: string) => {
          onUpdateVariable(key, [...items, { value }]);
        };
        const handleItemRemove = (value: string) => {
          const newItems = items.filter((item) => item.value !== value);
          onUpdateVariable(key, newItems);
        };
        return (
          <SwitchCase
            caseBy={{
              날짜: () => (
                <DateVariableCard
                  dates={items}
                  onDateChange={handleItemChange}
                  title={displayName}
                />
              ),
              링크: () => (
                <LinkVariableCard
                  links={items}
                  onValueChange={handleItemChange}
                  title={displayName}
                />
              ),
              사람: () => (
                <NameVariableCard
                  names={items.map((item) => item.value)}
                  onAddName={handleItemAdd}
                  onRemoveName={handleItemRemove}
                  title={displayName}
                />
              ),
              텍스트: () => (
                <TextVariableCard
                  onValueChange={handleItemChange}
                  texts={items}
                  title={displayName}
                />
              ),
            }}
            key={key}
            value={type}
          />
        );
      })}
    </div>
  );
};
