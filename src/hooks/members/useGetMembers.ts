import { useSuspenseQuery } from '@tanstack/react-query';
import { MemberArraySchema, MemberState } from '@/scheme/member.ts';
import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';

export const useGetMembers = (state: MemberState, search = '') => {
  return useSuspenseQuery({
    queryKey: ['members', state, search],
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
