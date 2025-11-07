import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { BaseTemplateSchema, TemplateListResponseSchema } from '@/query/template/schema';
import { defaultVariables, VariableType } from '@/types/editor';
import { formatTemplates } from '@/utils/date';
import { transformBodyHtmlToContent } from '@/utils/transformTemplate.ts';

const TypeMap: Record<string, VariableType> = {
  PERSON: '사람',
  DATE: '날짜',
  LINK: '링크',
  TEXT: '텍스트',
};

const templateKeys = {
  all: ['templates'] as const,
  detail: (id: number) => [...templateKeys.all, id] as const,
};

export const templateOptions = {
  all: () =>
    queryOptions({
      queryKey: ['templates'],
      queryFn: async () => {
        const data = await api.get('api/mails/templates').json();
        const response = TemplateListResponseSchema.parse(data).content;
        const templateData = response.map((template) => ({
          id: template.id,
          title: template.title,
          date: formatTemplates['2025.01.01'](template.updatedAt),
        }));
        return templateData;
      },
      staleTime: Infinity,
    }),
  detail: (templateId: number) =>
    queryOptions({
      queryKey: ['templates', templateId],
      queryFn: async () => {
        const data = await api.get(`api/mails/templates/${templateId}`).json();
        const response = BaseTemplateSchema.parse(data);

        const fixedVariables = response.variables.map((variable) => {
          if (!variable.type) {
            return defaultVariables.find((v) => v.id === variable.key)!;
          }
          return {
            id: variable.key,
            name: variable.displayName,
            type: TypeMap[variable.type],
            isFixed: false,
            differentForEachPerson: variable.perRecipient,
          };
        });

        const templateDetail = {
          id: response.id,
          title: response.title,
          content: transformBodyHtmlToContent(response.bodyHtml, fixedVariables),
          variables: fixedVariables,
          date: formatTemplates['2025.01.01'](response.updatedAt),
        };
        return templateDetail;
      },
      staleTime: Infinity,
    }),
};
