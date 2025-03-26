import { useQueryClient } from '@tanstack/react-query';
import { MemberState } from '@/data/members/schema.ts';
import { memberKeys } from '@/data/members/key.ts';

export const useInvalidateMembers = (state: MemberState) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: memberKeys.filter({ state }) });
};
