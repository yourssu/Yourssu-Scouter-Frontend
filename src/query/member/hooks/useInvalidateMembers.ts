import { useQueryClient } from '@tanstack/react-query';

import { memberOptions } from '@/query/member/options.ts';
import { MemberState } from '@/query/member/schema.ts';

export const useInvalidateMembers = (state: MemberState) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: memberOptions(state).queryKey });
};
