import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { MemberStateArraySchema } from '@/query/member/schema.ts';

export const memberStateOptions = () => {
  return queryOptions({
    queryKey: ['memberStates'],
    queryFn: async () => {
      const data = await api.get('members/states').json();
      return MemberStateArraySchema.parse(data);
    },
    staleTime: Infinity,
  });
};
