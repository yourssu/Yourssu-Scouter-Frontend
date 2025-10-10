import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { TemplateListSchema } from '@/query/template/schema';

export const templateOptions = () => {
  return queryOptions({
    queryKey: ['templates'],
    queryFn: async () => {
      const data = await api.get('api/mails/templates').json();
      return TemplateListSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
