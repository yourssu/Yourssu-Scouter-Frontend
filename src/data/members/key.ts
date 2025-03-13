import { MemberState } from '@/data/members/schema.ts';

export const getMembersQueryKey = (state?: MemberState, search?: string) => {
  const baseKey = 'members';
  if (!state) return [baseKey] as const;
  if (!search) return [baseKey, state] as const;
  return [baseKey, state, search] as const;
};

export const memberRolesQueryKey = ['memberRoles'] as const;

export const memberStatesQueryKey = ['memberStates'] as const;
