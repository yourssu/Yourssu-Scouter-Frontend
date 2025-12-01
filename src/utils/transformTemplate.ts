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

// <span ... data-key="key"></span> -> {{key}} 로 변환
export const transformContentToBodyHtml = (content: string) => {
  const spanWithDataKeyAttribute = /<span[^>]*data-key="([^"]*)"[^>]*><\/span>/g; // data-key 속성을 가진 <span> 태그를 찾는 정규식

  return content.replace(spanWithDataKeyAttribute, (_match, key) => {
    return `{{${key}}}`;
  });
};

// {{key}} -> < ... data-key="key" data-type="..." data-label="label" data-variable-chip></span> 로 변환
export const transformBodyHtmlToContent = (bodyHtml: string, variables: Variable[]) => {
  const curlyBracePattern = /{{(.*?)}}/g; // {{...}} 패턴을 찾는 정규식

  return bodyHtml.replace(curlyBracePattern, (match, key) => {
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
