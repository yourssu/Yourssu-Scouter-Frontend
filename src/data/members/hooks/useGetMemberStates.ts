import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { MemberStateArraySchema } from '@/data/members/schema.ts';
import { memberStateKeys } from '@/data/members/key.ts';

export const useGetMemberStates = () => {
  return useSuspenseQuery({
    queryKey: memberStateKeys.all,
    queryFn: async () => {
      const data = await api.get('members/states').json();
      return MemberStateArraySchema.parse(data);
    },
  });
};
