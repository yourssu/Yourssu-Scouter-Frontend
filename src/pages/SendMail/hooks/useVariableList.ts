import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { templateOptions } from '@/query/template/options';
import { Variable, VariableKeyType } from '@/types/editor';

export const useVariableList = (templateId: number) => {
  const { data: template } = useSuspenseQuery(templateOptions.detail(templateId));

  const [variables, setVariables] = useState<Variable[]>(template.variables);

  const handleVariableUpdate = (key: VariableKeyType, updatedItems: Variable['items']) => {
    setVariables((prevVariables) =>
      prevVariables.map((variable) =>
        variable.key === key ? { ...variable, items: updatedItems } : variable,
      ),
    );
  };

  return {
    variables,
    handleVariableUpdate,
  };
};
