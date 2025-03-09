import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { MemberRoleArraySchema } from '@/scheme/member.ts';

export const useGetMemberRoles = () => {
  return useSuspenseQuery({
    queryKey: ['memberRoles'],
    queryFn: async () => {
      const data = await api.get('members/roles').json();
      return MemberRoleArraySchema.parse(data);
    },
  });
};
