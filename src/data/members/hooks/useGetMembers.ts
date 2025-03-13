import { useSuspenseQuery } from '@tanstack/react-query';
import { MemberArraySchema, MemberState } from '@/data/members/schema.ts';
import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';
import { getMembersQueryKey } from '@/data/members/key.ts';

export const useGetMembers = (state: MemberState, search = '') => {
  return useSuspenseQuery({
    queryKey: getMembersQueryKey(state, search),
    queryFn: async () => {
      const res = await api.get(`members/${MEMBER_URI[state]}`, {
        searchParams: {
          search,
        },
      });
      const data = await res.json();
      return MemberArraySchema.parse(data);
    },
  });
};
