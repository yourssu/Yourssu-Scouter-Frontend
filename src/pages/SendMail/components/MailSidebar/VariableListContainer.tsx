import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { VariableList } from '@/pages/SendMail/components/MailSidebar/VariableList';
import { templateOptions } from '@/query/template/options';
import { VariableKeyType } from '@/types/editor';
import { Variable } from '@/types/editor';

interface VariableListContainerProps {
  templateId: number;
}

export const VariableListContainer = ({ templateId }: VariableListContainerProps) => {
  const { data: template } = useSuspenseQuery(templateOptions.detail(templateId));
  const [variables, setVariables] = useState<Variable[]>(template.variables);

  const handleVariableUpdate = (key: VariableKeyType, updatedItems: Variable['items']) => {
    const updatedVariables = variables.map((variable) =>
      variable.key === key ? { ...variable, items: updatedItems } : variable,
    );
    setVariables(updatedVariables);
  };

  return <VariableList onUpdateVariable={handleVariableUpdate} variables={variables} />;
};
