import { Variable } from '@/types/editor.ts';

const typeMap: {
  [key: string]: 'DATE' | 'LINK' | 'PERSON' | 'TEXT';
} = {
  날짜: 'DATE',
  링크: 'LINK',
  사람: 'PERSON',
  텍스트: 'TEXT',
};

export const transformBodyHtml = (content: string) => {
  const regex = /<span[^>]*data-key="([^"]*)"[^>]*><\/span>/g;

  return content.replace(regex, (_match, key) => {
    return `{{${key}}}`;
  });
};

export const transformVariables = (variables: Variable[]) => {
  return variables.map((variable) => {
    const baseVariable = {
      key: variable.id,
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
