import { getChipType } from '@/components/VariableChip/utils';
import { VariableTypeName } from '@/query/template/schema.ts';
import { BaseVariable, Variable } from '@/types/editor.ts';
import { VariableType } from '@/types/editor.ts';

const variableTypeMap = {
  날짜: 'DATE',
  링크: 'LINK',
  사람: 'PERSON',
  텍스트: 'TEXT',
  '사람/지원자': 'APPLICANT',
  '텍스트/파트명': 'PARTNAME',
} as const satisfies Record<VariableType, VariableTypeName>;

// <span ... data-key="key"></span> -> {{key}} 로 변환
export const transformContentToBodyHtml = (content: string) => {
  const spanWithDataKeyAttribute = /<span[^>]*data-key="([^"]*)"[^>]*><\/span>/g; // data-key 속성을 가진 <span> 태그를 찾는 정규식

  return content.replace(spanWithDataKeyAttribute, (_match, key) => {
    return `{{${key}}}`;
  });
};

// {{key}} -> < ... data-key="key" data-type="..." data-label="label" data-variable-chip></span> 로 변환
export const transformBodyHtmlToContent = (bodyHtml: string, variables: BaseVariable[]) => {
  const curlyBracePattern = /{{(.*?)}}/g; // {{...}} 패턴을 찾는 정규식

  return bodyHtml.replace(curlyBracePattern, (match, key) => {
    const variable = variables.find((v) => v.key === key);

    if (!variable) {
      return match;
    }

    return `<span data-key="${variable.key}" data-type="${getChipType(variable.type)}" data-label="${variable.displayName}" data-per-recipient="${variable.perRecipient}" data-variable-chip=""></span>`;
  });
};

export const transformVariables = (variables: Variable[]) => {
  return variables.map((variable) => {
    return {
      key: variable.key,
      type: variableTypeMap[variable.type],
      displayName: variable.displayName,
      perRecipient: variable.perRecipient,
    };
  });
};
