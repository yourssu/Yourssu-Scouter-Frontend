import { MemberState } from '@/data/members/schema.ts';

export const MEMBER_URI: Record<MemberState, string> = {
  액티브: 'active',
  비액티브: 'inactive',
  졸업: 'graduated',
  탈퇴: 'withdrawn',
} as const;
