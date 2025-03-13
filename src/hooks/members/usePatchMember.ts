import { useMutation } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';
import {
  MemberState,
  PatchMember,
  PatchMemberSchema,
} from '@/scheme/member.ts';

interface PatchMemberParams {
  memberId: number;
  params: PatchMember;
}

export const usePatchMember = (state: MemberState) => {
  return useMutation({
    mutationFn: async ({ memberId, params }: PatchMemberParams) => {
      await api.patch(`members/${MEMBER_URI[state]}/${memberId}`, {
        body: JSON.stringify(PatchMemberSchema.parse(params)),
      });
    },
  });
};
