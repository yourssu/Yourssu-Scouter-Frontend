import { MemberState } from '@/data/members/schema.ts';

type MemberFilter = { state?: MemberState; search?: string };

export const memberKeys = {
  all: ['members'] as const,
  filter: (filters: MemberFilter) => [...memberKeys.all, filters] as const,
};

export const memberRoleKeys = {
  all: ['memberRoles'] as const,
};

export const memberStateKeys = {
  all: ['memberStates'] as const,
};
