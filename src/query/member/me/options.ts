import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api';
import { MeSchema } from '@/query/member/schema';

export const meOption = () => {
  return queryOptions({
    queryKey: ['members', 'me'],
    queryFn: async () => {
      const res = await api.get('members/me').json();
      return MeSchema.parse(res);
    },
  });
};
