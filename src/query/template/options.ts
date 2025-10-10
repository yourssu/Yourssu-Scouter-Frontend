import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { TemplateListSchema, TemplateSchema } from '@/query/template/schema';

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
        return TemplateListSchema.parse(data);
      },
      staleTime: Infinity,
    }),
  detail: (templateId: number) =>
    queryOptions({
      queryKey: ['templates', templateId],
      queryFn: async () => {
        const data = await api.get(`api/mails/templates/${templateId}`).json();
        return TemplateSchema.parse(data);
      },
      staleTime: Infinity,
    }),
};
