import { useSuspenseQueries } from '@tanstack/react-query';

import { useMailVariableContext } from '@/pages/SendMail/context';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { Recipient } from '@/pages/SendMail/mail.type';
import { templateOptions } from '@/query/template/options';
import { Variable, VariableState } from '@/types/editor';

const transformToVariableCard = (
  v: Variable,
  recipients: Recipient[],
  variableValue: VariableState,
  actions: ReturnType<typeof useMailVariableContext>['actions'],
) => {
  const isIndividual = v.perRecipient;

  const items = isIndividual
    ? recipients.map((r) => ({
        label: r.name,
        value: variableValue.perApplicant[r.id]?.[v.key] ?? '',
      }))
    : [{ value: variableValue.common[v.key] ?? '' }];

  const handleUpdate = (idx: number, newValue: string) => {
    if (isIndividual) {
      actions.updateIndividualValue(recipients[idx].id, v.key, newValue);
    } else {
      actions.updateCommonValue(v.key, newValue);
    }
  };

  return {
    key: v.key,
    type: v.type,
    title: v.displayName,
    isIndividual,
    items,
    names: items.map((i) => i.value).filter(Boolean),
    handleUpdate,
  };
};

export const useVariableList = (templateId: number) => {
  const [{ data: template }] = useSuspenseQueries({
    queries: [templateOptions.detail(templateId)],
  });

  const { recipients } = useRecipientData();
  const { variableValue, actions } = useMailVariableContext();

  const templateVariables: Variable[] = template.variables.filter(
    (v) => v.displayName !== '지원자' && v.displayName !== '파트명',
  );

  const variableCardData = templateVariables.map((v) =>
    transformToVariableCard(v, recipients, variableValue, actions),
  );

  return { variableCardData };
};
