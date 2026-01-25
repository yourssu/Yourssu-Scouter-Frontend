import { useSuspenseQueries } from '@tanstack/react-query';

import { useMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { applicantOptions } from '@/query/applicant/options';
import { templateOptions } from '@/query/template/options';
import { Variable } from '@/types/editor';

export const useVariableList = (templateId: number, partId: number) => {
  const [{ data: template }, { data: applicants }] = useSuspenseQueries({
    queries: [templateOptions.detail(templateId), applicantOptions({ partId })],
  });
  const { variableValue, actions } = useMailVariables();
  const templateVariables: Variable[] = template.variables;

  return {
    templateVariables,
    applicants,
    variableValue,
    actions,
  };
};
