import { getChipType } from '@/components/VariableChip/utils';
import { Variable } from '@/types/editor.ts';

const typeMap: {
  [key: string]: 'DATE' | 'LINK' | 'PERSON' | 'TEXT';
} = {
  날짜: 'DATE',
  링크: 'LINK',
  사람: 'PERSON',
  텍스트: 'TEXT',
};

export const transformContentToBodyHtml = (content: string) => {
  const regex = /<span[^>]*data-key="([^"]*)"[^>]*><\/span>/g;

  return content.replace(regex, (_match, key) => {
    return `{{${key}}}`;
  });
};

export const transformBodyHtmlToContent = (bodyHtml: string, variables: Variable[]) => {
  const regex = /{{(.*?)}}/g;

  return bodyHtml.replace(regex, (match, key) => {
    const variable = variables.find((v) => v.id === key);

    if (!variable) {
      return match;
    }

    return `<span data-key="${variable.id}" data-type="${getChipType(variable.type)}" data-label="${variable.name}" data-variable-chip=""></span>`;
  });
};

export const transformVariables = (variables: Variable[]) => {
  return variables.map((variable) => {
    const baseVariable = {
      key: variable.id,
      type: variable.isFixed ? null : typeMap[variable.type],
      displayName: variable.name,
      perRecipient: variable.differentForEachPerson,
    };

    if (variable.isFixed) {
      return baseVariable;
    } else {
      return {
        ...baseVariable,
        type: typeMap[variable.type],
      };
    }
  });
};
