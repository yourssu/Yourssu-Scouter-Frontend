import { useQueryClient } from '@tanstack/react-query';
import { MemberState } from '@/data/members/schema.ts';
import { getMembersQueryKey } from '@/data/members/key.ts';

export const useInvalidateMembers = (state: MemberState) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: getMembersQueryKey(state) });
};
