import { useQueryClient } from '@tanstack/react-query';
import { MemberState } from '@/data/members/schema.ts';

export const useInvalidateMembers = (state: MemberState) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['members', state] });
};
