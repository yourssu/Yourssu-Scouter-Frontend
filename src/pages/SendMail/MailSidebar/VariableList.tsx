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
  const renderVariableCard = (v: Variable) => {
    // 공용 핸들러: 아이템의 특정 인덱스 값을 변경
    const handleItemChange = (index: number, newValue: string) => {
      const newItems = [...(v.items ?? [])];
      newItems[index] = { ...newItems[index], value: newValue };
      onUpdateVariable(v.key, newItems);
    };

    switch (v.type) {
      case '날짜':
        return (
          <DateVariableCard
            dates={v.items ?? []}
            onDateChange={handleItemChange}
            title={v.displayName}
          />
        );

      case '링크':
        return (
          <LinkVariableCard
            links={v.items ?? []}
            onValueChange={handleItemChange}
            title={v.displayName}
          />
        );

      case '사람':
        return (
          <NameVariableCard
            names={v.items?.map((item) => item.value) ?? []}
            onAddName={(name) => {
              const newItems = [...(v.items ?? []), { value: name }];
              onUpdateVariable(v.key, newItems);
            }}
            onRemoveName={(name) => {
              const newItems = (v.items ?? []).filter((item) => item.value !== name);
              onUpdateVariable(v.key, newItems);
            }}
            title={v.displayName}
          />
        );

      case '텍스트':
      default:
        return (
          <TextVariableCard
            onValueChange={handleItemChange}
            texts={v.items ?? []}
            title={v.displayName}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      {variables.map((v) => (
        <div key={v.key}>{renderVariableCard(v)}</div>
      ))}
    </div>
  );
};
