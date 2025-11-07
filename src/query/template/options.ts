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
          // 백엔드 응답을 프론트엔드 형식에 맞게 변환
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

        // 백엔드 응답 중 변수를 프론트엔드 형식에 맞게 변환
        const templateVariables = response.variables.map((variable) => {
          // 고정 변수(지원자명, 파트명)는 type이 null로 오기 때문에 미리 정의된 defaultVariables에서 찾아서 매핑
          if (!variable.type) {
            return defaultVariables.find((v) => v.id === variable.key)!;
          }
          // 그 외 변수들은 TypeMap을 사용하여 매핑
          // 나머지 항목들도 프론트엔드 형식에 맞게 변환
          return {
            id: variable.key,
            name: variable.displayName,
            type: TypeMap[variable.type],
            isFixed: false,
            differentForEachPerson: variable.perRecipient,
          };
        });

        // 최종적으로 템플릿 상세 데이터를 프론트엔드 형식에 맞게 변환
        const templateDetail = {
          id: response.id,
          title: response.title,
          content: transformBodyHtmlToContent(response.bodyHtml, templateVariables),
          variables: templateVariables,
          date: formatTemplates['2025.01.01'](response.updatedAt),
        };
        return templateDetail;
      },
      staleTime: Infinity,
    }),
};
