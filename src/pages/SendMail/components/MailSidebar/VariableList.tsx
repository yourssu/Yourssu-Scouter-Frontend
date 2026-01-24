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
  const { templateVariables, applicants, variableValue, actions } = useVariableList(
    templateId,
    partId,
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {templateVariables.map((v) => {
        const isIndividual = v.perRecipient;

        const items = isIndividual
          ? applicants.map((a) => ({
              label: a.name,
              value: variableValue.perApplicant[a.applicantId]?.[v.key] ?? '',
            }))
          : [{ value: variableValue.common[v.key] ?? '' }];

        const handleUpdate = (idx: number, newValue: string) => {
          if (isIndividual) {
            const applicantId = applicants[idx].applicantId;
            actions.updateIndividualValue(String(applicantId), v.key, newValue);
          } else {
            actions.updateCommonValue(v.key, newValue);
          }
        };

        return (
          <SwitchCase
            caseBy={{
              날짜: () => (
                <DateVariableCard dates={items} onDateChange={handleUpdate} title={v.displayName} />
              ),
              링크: () => (
                <LinkVariableCard
                  links={items}
                  onValueChange={handleUpdate}
                  title={v.displayName}
                />
              ),
              사람: () => (
                <NameVariableCard
                  names={items.map((i) => i.value).filter(Boolean)}
                  onAddName={(val) => (isIndividual ? null : actions.updateCommonValue(v.key, val))}
                  title={v.displayName}
                />
              ),
              텍스트: () => (
                <TextVariableCard
                  onValueChange={handleUpdate}
                  texts={items}
                  title={v.displayName}
                />
              ),
            }}
            key={v.key}
            value={v.type}
          />
        );
      })}
    </div>
  );
};
