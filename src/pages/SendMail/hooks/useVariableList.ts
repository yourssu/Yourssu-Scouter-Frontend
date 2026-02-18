import { useSuspenseQueries } from '@tanstack/react-query';

import { useMailVariableContext } from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options';
import { Applicant } from '@/query/applicant/schema';
import { templateOptions } from '@/query/template/options';
import { Variable, VariableState } from '@/types/editor';

const transformToVariableCard = (
  v: Variable,
  applicants: Applicant[],
  variableValue: VariableState,
  actions: ReturnType<typeof useMailVariableContext>['actions'],
) => {
  const isIndividual = v.perRecipient;

  const items = isIndividual
    ? applicants.map((a) => ({
        label: a.name,
        value: variableValue.perApplicant[String(a.applicantId)]?.[v.key] ?? '',
      }))
    : [{ value: variableValue.common[v.key] ?? '' }];

  const handleUpdate = (idx: number, newValue: string) => {
    if (isIndividual) {
      actions.updateIndividualValue(String(applicants[idx].applicantId), v.key, newValue);
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

export const useVariableList = (templateId: number, partId: number) => {
  const [{ data: template }, { data: applicants }] = useSuspenseQueries({
    queries: [templateOptions.detail(templateId), applicantOptions({ partId })],
  });
  const { variableValue, actions } = useMailVariableContext();
  const templateVariables: Variable[] = template.variables.filter(
    (v) => v.displayName !== '지원자' && v.displayName !== '파트명',
  );

  const variableCardData = templateVariables.map((v) =>
    transformToVariableCard(v, applicants, variableValue, actions),
  );

  return { variableCardData };
};
