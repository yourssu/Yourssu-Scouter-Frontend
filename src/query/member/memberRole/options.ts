import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { MemberRoleArraySchema } from '@/query/member/schema.ts';

export const memberRoleOptions = () => {
  return queryOptions({
    queryKey: ['memberRoles'],
    queryFn: async () => {
      const data = await api.get('members/roles').json();
      return MemberRoleArraySchema.parse(data);
    },
    staleTime: Infinity,
  });
};
