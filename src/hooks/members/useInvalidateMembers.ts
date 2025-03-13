import { useQueryClient } from '@tanstack/react-query';
import { MemberState } from '@/scheme/member.ts';

export const useInvalidateMembers = (state: MemberState) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['members', state] });
};
