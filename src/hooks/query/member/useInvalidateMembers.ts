import { useQueryClient } from '@tanstack/react-query';
import { MemberState } from '@/query/member/schema.ts';
import { memberOptions } from '@/query/member/options.ts';

export const useInvalidateMembers = (state: MemberState) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: memberOptions(state).queryKey });
};
