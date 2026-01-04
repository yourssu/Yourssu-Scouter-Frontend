import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { BaseTemplateSchema, TemplateListResponseSchema } from '@/query/template/schema';
import { VariableTypeName } from '@/query/template/schema.ts';
import { VariableType } from '@/types/editor';
import { transformBodyHtmlToContent } from '@/utils/transformTemplate.ts';

const variableTypeMap = {
  PERSON: '사람',
  DATE: '날짜',
  LINK: '링크',
  TEXT: '텍스트',
  APPLICANT: '사람/지원자',
  PARTNAME: '텍스트/파트명',
} as const satisfies Record<VariableTypeName, VariableType>;

export const templateKeys = {
  all: ['templates'] as const,
  detail: (id: number) => [...templateKeys.all, id] as const,
};

export const templateOptions = {
  all: () =>
    queryOptions({
      queryKey: templateKeys.all,
      queryFn: async () => {
        const data = await api.get('api/mails/templates').json();
        const response = TemplateListResponseSchema.parse(data).content;
        const templateData = response.map((template) => ({
          // 백엔드 응답을 프론트엔드 형식에 맞게 변환
          id: template.id,
          title: template.title,
          date: template.updatedAt,
        }));
        return templateData;
      },
      staleTime: Infinity,
    }),
  detail: (templateId: number) =>
    queryOptions({
      queryKey: templateKeys.detail(templateId),
      queryFn: async () => {
        const data = await api.get(`api/mails/templates/${templateId}`).json();
        const response = BaseTemplateSchema.parse(data);

        // 백엔드 응답 중 변수를 프론트엔드 형식에 맞게 변환
        const templateVariables = response.variables.map((variable) => {
          // 변수들은 TypeMap을 사용하여 매핑
          // 나머지 항목들도 프론트엔드 형식에 맞게 변환
          return {
            key: variable.key,
            displayName: variable.displayName,
            type: variableTypeMap[variable.type],
            perRecipient: variable.perRecipient,
          };
        });

        // 최종적으로 템플릿 상세 데이터를 프론트엔드 형식에 맞게 변환
        const templateDetail = {
          id: response.id,
          title: response.title,
          content: transformBodyHtmlToContent(response.bodyHtml, templateVariables),
          variables: templateVariables,
          date: response.updatedAt,
        };
        return templateDetail;
      },
      staleTime: Infinity,
    }),
};
